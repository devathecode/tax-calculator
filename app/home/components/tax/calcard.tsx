import React from 'react';
import Link from "next/link";
import Image from "next/image";

const Calcard = ({imageUrl, redirectUrl, text1, text2}: any) => {
    return (
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <Link href={redirectUrl}>
                <Image src={imageUrl} width="200" height="200" alt="Product" className="h-52 w-72 object-cover rounded-t-xl"/>
                <div className="px-4 py-3 w-72">
                    <span className="text-white mr-3 uppercase text-xs tracking-wider bg-gray-400 p-1 rounded-lg">FREE</span>
                    <p className="text-lg font-bold text-black truncate block capitalize">
                        {text1}
                        {text2 && <span className="text-gray-400 text-xs leading-tight">{`(${text2})`}</span>}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default Calcard;