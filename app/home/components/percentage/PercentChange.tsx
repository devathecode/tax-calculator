"use client";

import React, {useEffect, useState} from 'react';
import * as yup from "yup";
import {inputClass} from "@/app/core/constants";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import Formtext from "@/app/shared/formtext";
import Errormessage from "@/app/shared/Errormessage";

const schema = yup.object({
    valueOne: yup.number().positive().integer().required(),
    valueTwo: yup.number().positive().integer().required()
});
type FormValues = yup.InferType<typeof schema>;

const PercentChange = () => {
    const inputClasses: string = inputClass;
    const [increase, setIncrease] = useState<boolean>();
    const {register, setValue, watch, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(schema)
    });

    const [formValue, setFormValue] = useState<any>();

    useEffect(() => {
        const subscription = watch((value) => {
            setFormValue(calPercentDifference(value.valueOne || 0, value.valueTwo || 0));
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    const calPercentDifference = (num1: number, num2: number) => {
        setIncrease(num1 - num2 <= 0);
        const difference = num1 - num2;
        return difference / num1 * 100;
    }

    const onSubmit = (data: FormValues) => {
        localStorage.setItem('taxData', JSON.stringify(data));
    };

    return (
        <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-5">
            <div className="col-span-12 p-4">
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-12 gap-2">
                    <div className="col-span-12 border border-green-600 bg-green-400 text-white rounded-md">
                        <Formtext text="Percent difference between x and y" color="text-black text-base text-center py-2 uppercase"/>
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                        <input
                            {...register("valueOne")}
                            className={inputClasses}
                            id="username" type="number" min="0" placeholder="Enter First Value"/>
                        {errors.valueOne?.message && <Errormessage errorText="Please enter a valid value"/>}
                    </div>
                    <div className="col-span-12 sm:col-span-6">
                        <input
                            {...register("valueTwo")}
                            className={inputClasses}
                            id="username" type="number" min="0" placeholder="Enter Second Value"/>
                        {errors.valueTwo?.message && <Errormessage errorText="Please enter a valid value"/>}
                    </div>
                    {formValue != undefined && <div className="col-span-12 my-auto text-center">
                        There is an
                        {increase}
                        {increase ?
                            <span className="bg-green-400 border border-green-600 text-white px-1 rounded-md mx-1">increment</span> :
                            <span className="bg-red-400 border border-red-600 text-white px-1 rounded-md mx-1">decrement</span>
                            }
                        in the values by {Math.abs(formValue)} %
                    </div>}
                </form>
            </div>
        </div>
    );
};

export default PercentChange;