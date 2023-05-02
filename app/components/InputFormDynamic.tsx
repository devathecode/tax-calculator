"use client";
import React, {useEffect, useRef, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import Label from "@/app/shared/label";
import Formtext from "@/app/shared/formtext";
import SummaryDataRow from "@/app/shared/summaryDataRow";
import Hra from "@/app/components/hra";
import Errormessage from "@/app/shared/Errormessage";
import * as net from "net";

interface FormValues {
    [key: string]: any;
}

interface tempData {
    taxLiability: number;
    netHra: number;
    taxableIncome: number;
}

const InputFormDynamic = () => {
    const reportTemplateRef = useRef(null);
    const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const { register, watch, handleSubmit, control } = useForm<FormValues>();
    const [selectedOption, setSelectedOption] = useState("");
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [options, setOptions] = useState<string[]>(["PF", "PPF", "Education_Loan_interest"]);
    const [formValue, setFormValue] = useState<FormValues>({
        GrossSalary: 0,
        BasicSalary: 0,
        HRA: 0,
        rent: 0,
    });
    const [showHRA, setShowHRA] = useState(false);
    const [impData, setImpData] = useState<tempData>({
        taxLiability: 0,
        taxableIncome: 0,
        netHra: 0
    })

    const calculateTaxLiability = (data: any) => {
        let taxable = calculateTaxableIncome(data);
        console.log('taxable in taxLiability function', taxable);
        let arr: any = [];
        let diff = 0;
        diff = taxable - 250000;
        if (diff > 0) {
            arr.push(0);
            taxable = diff;
            diff = taxable - 250000;
            if (diff > 0) {
                arr.push(12500);
                taxable = diff;
                diff = taxable - 500000;
                if (diff > 0) {
                    arr.push(100000);
                    taxable = diff;
                    arr.push(calPercent(Math.abs(taxable), 30))
                } else {
                    arr.push(calPercent(Math.abs(taxable), 20))
                }
            } else {
                arr.push(calPercent(Math.abs(taxable), 5))
            }
        } else {
            return 0;
        }

        console.log('arr in taxLiability function', arr);
        return arr.reduce((a: any, b: any) => a + b, 0)
    }
    const calculateNetHRA = (data: any) => {
        if(data){
            if (data.HRA && data.rent && data.BasicSalary) {
                const actualHRA = data.HRA * 12;
                const fifthyPerCentMonthly = (data.BasicSalary * 12) / 2;
                const excessRent = (data.rent * 12) - calPercent(data.BasicSalary * 12, 10);
                console.log('excess', excessRent);
                return Math.abs(Math.min(actualHRA, fifthyPerCentMonthly, excessRent))
            } else {
                return 0
            }
        }
        else{
            return 0
        }
    }
    const calculateTaxableIncome = (data: any) => {
        const { GrossSalary, BasicSalary = '0', ...newObj} = data;
        console.log('data', data);
        const obj = options.reduce((acc: any, curr: any) => {
            if (curr in newObj) {
                acc[curr] = newObj[curr];
            } else {
                acc[curr] = 0;
            }
            return acc;
        }, {});
        const HRA = calculateNetHRA(data);

        console.log('obj', obj);
        // const deductions = Number(PF) * 12 + Number(PPF) * 12 + Number(SIP) * 12 + HRA;
        const deductions = Number(Object.values(obj).reduce((acc: any, curr: any) => acc + (curr * 12), 0));
        console.log('deductions', deductions);
        const taxableIncome = Number(GrossSalary) * 12 - 50000;

        const netSalary = taxableIncome - (deductions + HRA);

        return netSalary
    }

    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            setFormValue(value);
            setImpData({
                taxableIncome: calculateTaxableIncome(value),
                taxLiability: calculateTaxLiability(value),
                netHra: calculateNetHRA(value)
            });
        });
        return () => subscription.unsubscribe();
    }, [watch, formValue, impData]);
    const calPercent = (num: number, percent: number) => {
        return (percent * num) / 100
    }
    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (selectedOptions.includes(value)) {
            alert(`"${value}" has already been selected.`);
        } else {
            setSelectedOption(value);
        }
    };
    const handleAddInput = () => {
        setSelectedOptions([...selectedOptions, selectedOption]);
        setSelectedOption("");
    };
    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-5">
            <div className="col-span-6 px-4 order-1">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12">
                    <div className="col-span-12 mb-4">
                        <Label text1="Gross Income" text2="per month"/>
                        <input
                            {...register("GrossSalary")}
                            className={inputClasses}
                            id="GrossSalary" type="number" placeholder="Enter your Gross Income per month"/>
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="Basic Income" text2="per month"/>
                        <input
                            {...register("BasicSalary")}
                            className={inputClasses}
                            id="BasicSalary" type="number" placeholder="Enter your Gross Income per month"/>
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="HRA" text2="House Rent Allowance per month"/>
                        <input
                            {...register("HRA")}
                            className={inputClasses}
                            id="username" type="number" placeholder="Enter your HRA per month"/>
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="House Rent" text2="House Rent per month"/>
                        <input
                            {...register("rent")}
                            className={inputClasses}
                            id="rent" type="number" placeholder="Enter your Actual House rent per month"/>
                    </div>
                    {selectedOptions.map((selectedOption, index) => (
                        <div key={index} className="col-span-12 mb-4">
                            <Label text1={selectedOption.split('_').join(' ')} text2="per month"/>
                            <input
                                id={selectedOption}
                                type="number"
                                placeholder={`Enter your ${selectedOption.split('_').join(' ')} per month`}
                                className={inputClasses}
                                {...register(selectedOption)} />
                        </div>
                    ))}
                    {/*<button type="submit" className="bg-green-500 w-32 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">*/}
                    {/*    Submit*/}
                    {/*</button>*/}
                </form>
            </div>
            <div className="col-span-6 px-4 order-3">
                <div className="grid grid-cols-12">
                    <div className="col-span-12">
                        <Label text1="Select claim category" text2="per month"/>
                    </div>
                    <div className="col-span-12 mb-4 flex justify-between gap-2">
                        <select
                            onChange={handleDropdownChange}
                            className={inputClasses}
                        >
                            <option value="">Select an option</option>
                            {options.map((option) => (
                                <option key={option.split('_').join(' ')} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        <button onClick={handleAddInput} className={`bg-green-500 w-32 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ${!selectedOption ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={!selectedOption}>
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-span-6 bg-gray-100 p-4 order-2">
                <Formtext text="Summary Report" color="text-black uppercase"/>

                {formValue && (<div className="grid grid-cols-12" ref={reportTemplateRef}>
                    {formValue.GrossSalary * 12 < 500000 && formValue.GrossSalary > 0 ?
                        <div className="text-center col-span-12 text-xl text-gray-500 mt-10">
                            You are gross salary {(formValue.GrossSalary * 12).toLocaleString("en-In")} per/year is less than 5,00,000
                            You are not eligible for any tax
                        </div>
                        :
                        <>
                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Gross Salary" data={formValue.GrossSalary * 12}/>}

                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Standard Deduction" data={50000}/>}

                            {formValue.HRA > 0 && formValue.rent > 0 && formValue.BasicSalary &&
                                <div className={`col-span-12 flex justify-between px-2`}>
                                    <div>
                                        <span className="text-gray-700 font-bold">HRA</span>
                                        <span
                                            onClick={() =>{setShowHRA(!showHRA)}}
                                            className="italic text-xs ml-1 text-sky-600 cursor-pointer hover:underline">(House Rent Allowance)</span>
                                    </div>
                                    <div className="text-lg text-black/[0.5]">{impData.netHra.toLocaleString('en-IN')}</div>
                                </div>}

                            {impData.netHra > 0 && showHRA && <Hra data={formValue}/>}

                            {formValue.PF > 0 &&
                                <div className="col-span-12">
                                    <Formtext text="Section 80C" color="text-sm text-gray-500"/>
                                </div>
                            }

                            {formValue.PF > 0 && <SummaryDataRow text1="EPF or PF" text2="Employee Provident Fund" data={formValue.PF * 12}/>}

                            {formValue.PPF > 0 && <SummaryDataRow text1="PPF" text2="Public Provident Fund" data={formValue.PPF * 12}/>}

                            {formValue.SIP > 0 && <SummaryDataRow text1="SIP" text2="Systematic Investment Plan" data={formValue.SIP * 12}/>}

                            {formValue.Education_Loan_interest > 0 &&
                                <div className="col-span-12">
                                    <Formtext text="Section 80E" color="text-sm text-gray-500"/>
                                </div>
                            }

                            {formValue.Education_Loan_interest > 0 && <SummaryDataRow text1="Education Loan" text2="Education loan interest anually" data={formValue.Education_Loan_interest * 12}/>}

                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Taxable Income"
                                                                          classes="border-t border-gray-300 mt-3 pt-1"
                                                                          data={impData.taxableIncome}/>}
                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Tax Liability" data={impData.taxLiability}/>}
                        </>
                    }
                </div>)}
            </div>
        </div>
    );
};

export default InputFormDynamic;