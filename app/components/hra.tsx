import React from 'react';

const Hra = (props: any) => {
    console.log('props', props.data)

    return (
        <div className="col-span-12 bg-gray-200 p-4">
            <div className="grid grid-cols-12">
                <div className="col-span-12 flex justify-between">
                    <span className="text-sm font-bold uppercase">
                        <span className="text-gray-700 font-bold">Actual HRA Received</span>
                    </span>
                    <span className="text-sm text-black/[0.5]">{(props.data.HRA * 12).toLocaleString('en-In')}</span>
                </div>
                <div className="col-span-12 flex justify-between">
                    <span className="text-sm font-bold uppercase">
                        <span className="text-gray-700 font-bold">50% of Basic Salary</span>
                    </span>
                    <span className="text-sm text-black/[0.5]">{((props.data.BasicSalary * 12)/2).toLocaleString('en-In')}</span>
                </div>
                <div className="col-span-12 flex justify-between">
                    <span className="text-sm font-bold uppercase">
                        <span className="text-gray-700 font-bold">Excess of rent paid over 10% of annual basic salary</span>
                    </span>
                    <span className="text-sm text-black/[0.5]">{(Math.abs((props.data.rent*12) - (10 * (props.data.BasicSalary * 12)) /100)).toLocaleString('en-IN')}</span>
                </div>
                <div className="col-span-12 flex justify-between text-xs">
                    <div className="text-green-700 bg-green-200 p-1 w-full">
                        <span className="font-bold">NOTE : </span>
                        <span>We can only claim the least of the above three HRA</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hra;