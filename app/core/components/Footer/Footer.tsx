import React from 'react';
import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-gray-100 py-10 px-2 sm:px-12 2xl:px-40">
            <Image src="/images/logo-no-background.png" width="300" height="70" className="w-40" alt="Logo"/>
        </div>
    );
};

export default Footer;