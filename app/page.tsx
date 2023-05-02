import Inputform from "@/app/components/Inputform";
import Formtext from "@/app/shared/formtext";
import React from "react";
import InputFormDynamic from "@/app/components/InputFormDynamic";


export default function Home() {
  return (
    <main className="max-w-7xl mx-auto">
        <Formtext text="Realtime Tax Calculator" color="text-black text-base lg:text-xl xl:text-4xl text-center py-5 uppercase"/>
        <InputFormDynamic/>
        {/*<Inputform/>*/}
    </main>
  )
}
