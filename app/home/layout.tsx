"use client";

import React from 'react';
import Header from "@/app/core/components/Header/Header";
import Head from "@/app/home/head";

export default function HomeLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <>
            <Head/>
            <Header/>
            <main>
                {children}
            </main>
            {/*<Footer/>*/}
        </>
    )
}