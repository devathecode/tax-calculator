import React from 'react';
import Formtext from "@/app/shared/formtext";
import InputFormDynamic from "@/app/home/components/InputFormDynamic";

const tax = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Formtext text="Realtime Tax Calculator" color="text-black text-base lg:text-xl xl:text-4xl text-center py-5 uppercase"/>
            <InputFormDynamic/>
        </div>
    );
};

export default tax;