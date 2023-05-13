"use client";
import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import { useRef } from 'react';
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import Hra from "@/app/home/components/tax/hra";
import Formtext from "@/app/shared/formtext";
import Label from "@/app/shared/label";
import Errormessage from "@/app/shared/Errormessage";
import SummaryDataRow from "@/app/shared/summaryDataRow";

const schema = yup.object({
    GrossSalary: yup.number().positive().integer().required(),
    BasicSalary: yup.number().positive().integer(),
    HRA: yup.number().positive().integer(),
    rent: yup.number().positive().integer(),
    active: yup.boolean(),
    PF: yup.number().positive().integer(),
    PPF: yup.number().positive().integer(),
    SIP: yup.number().positive().integer(),
    EducationLoan: yup.number().positive().integer(),
});
type FormValues = yup.InferType<typeof schema>;

const Inputform = () => {
    const reportTemplateRef = useRef(null);
    const inputClasses = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    const [showHRA, setShowHRA] = useState(false);
    const [taxLiability, setTaxLiability] = useState(0);
    const [formValue, setFormValue] = useState<any>({
        GrossSalary: 0,
        BasicSalary: 0,
        HRA: 0,
        rent: 0,
        active: false,
        PF: 0,
        PPF: 0,
        SIP: 0,
        EducationLoan: 0,
    });
    const {register, setValue, watch, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(schema),
        defaultValues: localStorage.getItem('taxData') && JSON.parse(String(localStorage.getItem('taxData')))
    });

    const calculateTaxLiability = (data: any) => {
        const actualHRA = data.HRA * 12;
        const fifthyPerCentMonthly = (data.BasicSalary * 12) / 2;
        const excessRent = (data.rent * 12) - calPercent(data.BasicSalary * 12, 10);
        const hra = Math.abs(Math.min(actualHRA, fifthyPerCentMonthly, excessRent))
        let taxable = Number(data.GrossSalary * 12 - 50000 - hra - data.PF * 12 - data.PPF * 12 - data.SIP * 12 - data.EducationLoan * 12);
        let arr = [];
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
            setTaxLiability(0);
        }
        setTaxLiability(arr.reduce((a, b) => a + b, 0))
    }

    useEffect(() => {
        if(localStorage.getItem('taxData')){
            setFormValue(JSON.parse(localStorage.getItem('taxData') || ''));
            calculateTaxLiability(formValue)
        }

        const subscription = watch((value, {name, type}) => {
            setFormValue(() =>{
                return value
            });
            calculateTaxLiability(value);
        });
        return () => subscription.unsubscribe();
    }, [watch, calculateTaxLiability]);


    const onSubmit = (data: FormValues) => {
        localStorage.setItem('taxData', JSON.stringify(data));
    };

    const netHRA = () => {
        if (formValue.HRA && formValue.rent) {
            const actualHRA = formValue.HRA * 12;
            const fifthyPerCentMonthly = (formValue.BasicSalary * 12) / 2;
            const excessRent = (formValue.rent * 12) - calPercent(formValue.BasicSalary * 12, 10);
            console.log('excess', excessRent);
            return Math.abs(Math.min(actualHRA, fifthyPerCentMonthly, excessRent));
        } else {
            return 0
        }
    }

    const calPercent = (num: number, percent: number) => {
        return (percent * num) / 100
    }
    // @ts-ignore
    return (
        <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-5">
            <div className="col-span-6 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12">
                    <div className="col-span-12 mb-4">
                        <Label text1="Gross Income" text2="per month"/>
                        <input
                            {...register("GrossSalary")}
                            className={inputClasses}
                            id="username" type="number" placeholder="Enter your Gross Income per month"/>
                        {errors.GrossSalary?.message && <Errormessage errorText="Please enter a valid GrossSalary"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="Basic Income" text2="per month"/>
                        <input
                            {...register("BasicSalary")}
                            className={inputClasses}
                            id="BasicSalary" type="number" placeholder="Enter your Gross Income per month"/>
                        {errors.BasicSalary?.message && <Errormessage errorText="Please enter a valid BasicSalary"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="HRA" text2="House Rent Allowance per month"/>
                        <input
                            {...register("HRA")}
                            className={inputClasses}
                            id="username" type="number" placeholder="Enter your HRA per month"/>
                        {errors.HRA?.message && <Errormessage errorText="Please enter a valid HRA"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="House Rent" text2="House Rent per month"/>
                        <input
                            {...register("rent")}
                            className={inputClasses}
                            id="rent" type="number" placeholder="Enter your Actual House rent per month"/>
                        {errors.rent?.message && <Errormessage errorText="Please enter a valid rent"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Formtext text="Section 80C"/>
                        <Label text1="EPF or PF" text2="Employee Provident Fund per month"/>
                        <input
                            {...register("PF")}
                            className={inputClasses}
                            id="PF" type="number" placeholder="Enter your EPF per month"/>
                        {errors.PF?.message && <Errormessage errorText="Please enter a valid EPF"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="PPF" text2="Public Provident Fund per month"/>
                        <input
                            {...register("PPF")}
                            className={inputClasses}
                            id="PF" type="number" placeholder="Enter your PPF per month"/>
                        {errors.PPF?.message && <Errormessage errorText="Please enter a valid PPF"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Label text1="SIP"
                               text2="Systematic Investment plan per month"
                               toolTip="SIP is a method of investing in mutual funds where a fixed amount of money is invested at regular intervals, typically monthly.
                                 SIPs can be used to invest in a variety of mutual funds, including ELSS funds. However, unlike ELSS, there is no specific lock-in period
                                  for SIP investments."
                               toolTipBold="Lock in period of SIP should be more than 3 years"/>
                        <input
                            {...register("SIP")}
                            className={inputClasses}
                            id="PF" type="number" placeholder="Enter your SIP per month"/>
                        {errors.SIP?.message && <Errormessage errorText="Please enter a valid SIP"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <Formtext text="Section 80E"/>
                        <Label text1="Education Loan" text2="Education Loan Interest per month"/>
                        <input
                            {...register("EducationLoan")}
                            className={inputClasses}
                            id="EducationLoan" type="number" placeholder="Enter your Education Loan interest per month"/>
                        {errors.EducationLoan?.message && <Errormessage errorText="Please enter a valid Education Loan interest"/>}
                    </div>
                    <div className="col-span-12 mb-4">
                        <button type="submit"
                                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                            Save
                        </button>
                        <button type="button"
                                className="bg-red-500 ml-2 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    localStorage.removeItem('taxData')
                                }}>
                            Reset
                        </button>
                    </div>
                </form>
            </div>
            <div className="col-span-6 bg-gray-100 p-4">
                <Formtext text="Summary Report" color="text-black uppercase"/>

                <div className="grid grid-cols-12" ref={reportTemplateRef}>
                    <div className="col-span-12 flex my-4 hidden">
                        <span className="mr-2 w-32">{formValue.active ? "New Regime" : "Old Regime"}</span>
                        <label className="flex items-center cursor-pointer">
                            <div className="relative">
                                <input type="checkbox" className="sr-only" {...register("active")} />
                                <div
                                    className={`block ${formValue.active ? "bg-blue-600" : "bg-gray-400"} w-14 h-8 rounded-full`}></div>
                                <div
                                    className={`dot absolute left-1 top-1 ${formValue.active ? "bg-white" : "bg-gray-300"} w-6 h-6 rounded-full transition`}></div>
                            </div>
                        </label>
                    </div>

                    {formValue.GrossSalary * 12 < 500000 && formValue.GrossSalary > 0 ?
                        <div className="text-center col-span-12 text-xl text-gray-500 mt-10">
                            You are gross salary {(formValue.GrossSalary * 12).toLocaleString("en-In")} per/year is less than 5,00,000
                            You are not eligible for any tax
                        </div>
                        :
                        <>
                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Gross Salary" data={formValue.GrossSalary * 12}/>}

                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Standard Deduction" data={50000}/>}

                            {formValue.HRA > 0 && formValue.rent > 0 &&
                                <div className={`col-span-12 flex justify-between px-2`}>
                                    <div>
                                        <span className="text-gray-700 font-bold">HRA</span>
                                        <span
                                            onClick={() =>{setShowHRA(!showHRA)}}
                                            className="italic text-xs ml-1 text-sky-600 cursor-pointer hover:underline">(House Rent Allowance)</span>
                                    </div>
                                    <div className="text-lg text-black/[0.5]">{(netHRA()).toLocaleString("en-IN")}</div>
                                </div>}

                            {formValue.HRA > 0 && formValue.rent > 0 && showHRA && <Hra data={formValue}/>}

                            {formValue.PF > 0 &&
                                <div className="col-span-12">
                                    <Formtext text="Section 80C" color="text-sm text-gray-500"/>
                                </div>
                            }

                            {formValue.PF > 0 && <SummaryDataRow text1="EPF or PF" text2="Employee Provident Fund" data={formValue.PF * 12}/>}

                            {formValue.PPF > 0 && <SummaryDataRow text1="PPF" text2="Public Provident Fund" data={formValue.PPF * 12}/>}

                            {formValue.SIP > 0 && <SummaryDataRow text1="SIP" text2="Systematic Investment Plan" data={formValue.SIP * 12}/>}

                            {formValue.EducationLoan > 0 &&
                                <div className="col-span-12">
                                    <Formtext text="Section 80E" color="text-sm text-gray-500"/>
                                </div>
                            }

                            {formValue.EducationLoan > 0 && <SummaryDataRow text1="Education Loan" text2="Education loan interest anually" data={formValue.EducationLoan * 12}/>}

                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Total" text2="Education loan interest anually" data={formValue.PPF * 12 + formValue.PF * 12 + formValue.SIP * 12}/>}

                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Taxable Income"
                                                                          classes="border-t border-gray-300 mt-3 pt-1"
                                                                          data={formValue.GrossSalary * 12 - 50000 - netHRA() - formValue.PF * 12 - formValue.PPF * 12 - formValue.SIP * 12}/>}

                            {formValue.GrossSalary > 0 && <SummaryDataRow text1="Tax Liability" data={taxLiability}/>}
                        </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Inputform;