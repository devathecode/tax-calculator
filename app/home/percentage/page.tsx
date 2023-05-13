import React from 'react';
import Formtext from "@/app/shared/formtext";
import PercentOff from "@/app/home/components/percentage/percentOff";
import PercentChange from "@/app/home/components/percentage/PercentChange";

export const metadata = {
    title: 'Percentage Calculator | GoCalc',
    description: 'Home page of GoCalc'
}

const page = () => {
    return (
        <div>
            <Formtext text="Realtime Percentage Calculator" color="text-black text-base lg:text-xl xl:text-4xl text-center py-5 uppercase"/>
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6">
                    <PercentOff/>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <PercentChange/>
                </div>
            </div>
        </div>
    );
};

export default page;