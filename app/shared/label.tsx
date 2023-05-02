import React from 'react';
import Tooltip from "@/app/shared/tooltip";

const Label = ({text1, text2, toolTip, toolTipBold}: any) => {
    return (
        <label className="block mb-2 flex items-center" htmlFor="username">
            <span className="text-gray-700 font-bold">{text1}</span>
            <span className="italic text-xs ml-1 text-gray-500">({text2})</span>
            {toolTip && <Tooltip text={toolTip} bold={toolTipBold}/>}
        </label>
    );
};

export default Label;