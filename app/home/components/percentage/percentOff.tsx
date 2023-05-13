"use client";

import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Errormessage from "@/app/shared/Errormessage";
import Formtext from "@/app/shared/formtext";
import {inputClass} from "@/app/core/constants"

const schema = yup.object({
    percent: yup.number().positive().integer().required(),
    value: yup.number().positive().integer().required()
});
type FormValues = yup.InferType<typeof schema>;
const PercentOff = () => {
    const inputClasses: string = inputClass;
    const {register, setValue, watch, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const [formValue, setFormValue] = useState<any>();

    useEffect(() => {
        const subscription = watch((value, {name, type}) => {
            if(value.value && value.percent){
                setFormValue(calPercent(value.value, value.percent));
            }
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const calPercent = (num: number, percent: number) => {
        return (percent / 100) * num;
    }

    const onSubmit = (data: FormValues) => {
        localStorage.setItem('taxData', JSON.stringify(data));
    };
    return (
        <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-5">
            <div className="col-span-12 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-2">
                    <div className="col-span-12 border border-green-600 bg-green-400 text-white rounded-md">
                        <Formtext text="what is x % of y" color="text-black text-base text-center py-2 uppercase"/>
                    </div>
                    <div className={formValue === 0 || formValue === undefined ? 'col-span-12 sm:col-span-5' : 'col-span-12 sm:col-span-3'}>
                        <input
                            {...register("percent")}
                            className={inputClasses}
                            id="username" type="number" min="0" placeholder="Enter Percetage"/>
                        {errors.percent?.message && <Errormessage errorText="Please enter a valid percent"/>}
                    </div>
                    <div
                        className={formValue === 0 || formValue === undefined ? 'col-span-12 sm:col-span-2 my-auto place-self-center' : 'col-span-12 sm:col-span-1 my-auto place-self-center'}>
                        <p className="text-xl">% of</p>
                    </div>
                    <div className={formValue === 0 || formValue === undefined ? 'col-span-12 sm:col-span-5' : 'col-span-12 sm:col-span-3'}>
                        <input
                            {...register("value")}
                            className={inputClasses}
                            id="username" type="number" min="0" placeholder="Enter Value"/>
                        {errors.value?.message && <Errormessage errorText="Please enter a valid value"/>}
                    </div>
                    {formValue > 0 && formValue != undefined && <div className="col-span-12 sm:col-span-5 text-center sm:text-left my-auto">
                        <span className="">{` =  ${formValue}`}</span>
                    </div>}
                </form>
            </div>
        </div>
    );
};

export default PercentOff;