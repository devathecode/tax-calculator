import React from 'react';
import Formtext from "@/app/shared/formtext";
import InputFormDynamic from "@/app/home/components/tax/InputFormDynamic";
import Info from "@/app/shared/info";

export const metadata = {
    title: 'Tax Calculator',
    description: 'A calculator that can be used to calculate your taxes.',
    keywords: ['tax', 'calculator', 'tax calculator', 'tax planning', 'tax preparation']
}

const tax = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Formtext text="Realtime Tax Calculator" color="text-black text-base lg:text-xl xl:text-4xl text-center py-5 uppercase"/>
            <Info>
               <p>
                   The Tax Liability Calculator is a powerful and easy-to-use app that helps you calculate your tax liability in real time based on the old tax regime.
                   With this app, you can quickly and easily enter your income, deductions, and other relevant information, and the app will instantly calculate your tax liability.
               </p>

                <p className="my-3">
                    The Tax Liability Calculator is a valuable tool for anyone who wants to stay on top of their taxes.
                    With this app, you can easily see how much tax you owe, and you can make sure that you are taking advantage of all of the available deductions and credits.
                </p>

                <p className="mb-2">
                    The Tax Liability Calculator is also a great way to plan for your taxes.
                    With this app, you can see how much tax you will owe in the future, and you can make adjustments to your income and deductions to minimize your tax liability.
                </p>


                <p className="font-bold">Features:</p>
                <ul className="list-disc ps-8">
                    <li>
                        Calculates your tax liability in real time based on the old tax regime
                    </li>
                    <li>
                        Easy to use interface
                    </li>
                    <li>
                        Supports a variety of income, deductions, and other relevant information
                    </li>
                    <li>
                        Valuable tool for staying on top of your taxes
                    </li>
                    <li>
                        Great way to plan for your taxes
                    </li>
                </ul>
            </Info>
            <InputFormDynamic/>
        </div>
    );
};

export default tax;