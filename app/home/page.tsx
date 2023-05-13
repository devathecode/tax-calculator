import React from 'react';
import Calcard from "@/app/home/components/tax/calcard";
import Image from "next/image";
export const metadata = {
    title: 'Home | GoCalc',
    description: 'Home page of GoCalc'
}


interface cardListData {
    id: number;
    imageUrl: string;
    redirectUrl: string;
    text1: string;
    text2?: string;
}

const home = () => {
    const textData: cardListData[] = [
        {
            id: 1,
            imageUrl: '/images/tax-card.avif',
            redirectUrl: '/home/tax',
            text1: 'Tax Calculator',
            text2: 'Old Regime'
        },
        {
            id: 2,
            imageUrl: '/images/percentage-card-img.webp',
            redirectUrl: '/home/percentage',
            text1: 'Percentage Calculator'
        }
    ]
    return (
        <>
            <Image src="/images/hero.png" priority={true} width="1200" height="800" className="w-full h-full object-cover max-h-[35rem]" alt="Logo"/>
            <div className="max-w-6xl mx-auto py-8">
                <div className="grid grid-cols-12 gap-6">
                    {textData.map((item) =>{
                        return <div key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4 place-self-center">
                            <Calcard imageUrl={item.imageUrl} redirectUrl={item.redirectUrl} text1={item.text1} text2={item.text2}/>
                        </div>
                    })}
                </div>
            </div>
        </>
    );
};

export default home;