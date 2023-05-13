import React from 'react';
import Formtext from "@/app/shared/formtext";
import PercentOff from "@/app/home/components/percentage/percentOff";
import PercentChange from "@/app/home/components/percentage/PercentChange";
import Info from "@/app/shared/info";

export const metadata = {
    title: 'Percentage Calculator',
    description: 'A calculator that can be used to calculate percentages.',
    keywords: ['percentage', 'calculator', 'percentage calculator']
}

const page = () => {
    return (
        <>
            <Formtext text="Realtime Percentage Calculator"
                      color="text-black text-base lg:text-xl xl:text-4xl text-center py-5 uppercase"/>
            <div className="grid grid-cols-12 gap-2 sm:gap-3 md:gap-5">
                <Info>
                    <p className="mb-2">
                        Its a realtime percentage calculator in which you do not need to input the data and then submit and wait and then
                        see the response. Responses are after you in realtime with no wait time.
                    </p>

                    <p className="font-bold">Features:</p>
                    <ul className="list-disc ps-8">
                        <li>
                            Calculate x% of y.
                        </li>
                        <li>
                            Calculate percentage increase or decrease between two values
                        </li>
                    </ul>
                </Info>
                <div className="col-span-12 lg:col-span-6">
                    <PercentOff/>
                </div>
                <div className="col-span-12 lg:col-span-6">
                    <PercentChange/>
                </div>
            </div>
        </>
    );
};

export default page;