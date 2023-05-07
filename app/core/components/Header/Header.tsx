import React from 'react';
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <div className="flex justify-center py-3 bg-gray-200">
            <Link href="/home" className="cursor-pointer">
                <Image src="/images/logo-no-background.png" width="300" height="70" className="w-32 sm:w-40 md:w-44 lg:w-48" alt="Logo"/>
            </Link>
        </div>
    );
};

export default Header;