import React from 'react';

const SummaryDataRow = ({data, text1, text2, classes}: any) => {
    return (
        <div className={`col-span-12 flex justify-between px-2 ${classes}`}>
            <div>
                {text1 && <span className="text-gray-700 font-bold">{text1}</span>}
                {text2 && <span className="italic text-xs ml-1 text-gray-500">({text2})</span>}
            </div>
            <div className="text-lg text-black/[0.5]">{data.toLocaleString("en-IN")}</div>
        </div>
    );
};

export default SummaryDataRow;