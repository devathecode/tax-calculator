import React from 'react';
import Formtext from "@/app/shared/formtext";
import InputFormDynamic from "@/app/home/components/tax/InputFormDynamic";

export const metadata = {
    title: 'Tax Calculator | GoCalc',
    description: 'Home page of GoCalc'
}

const tax = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Formtext text="Realtime Tax Calculator" color="text-black text-base lg:text-xl xl:text-4xl text-center py-5 uppercase"/>
            <InputFormDynamic/>
        </div>
    );
};

export default tax;