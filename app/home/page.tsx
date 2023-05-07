import React from 'react';
import Calcard from "@/app/home/components/calcard";
import Link from "next/link";
import Image from "next/image";

const home = () => {
    return (
        <>
            <Image src="/images/hero.png" width="1200" height="800" className="w-full h-full object-cover max-h-[35rem]" alt="Logo"/>
            <div className="max-w-6xl mx-auto py-8">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 md:col-span-6 lg:col-span-4 place-self-center">
                        <Calcard/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default home;