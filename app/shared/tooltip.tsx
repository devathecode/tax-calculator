import React from 'react';

const Tooltip = ({text, bold} : any) => {
    return (
        <div className="relative inline-block group">
            <button type="button"
                    className="bg-gray-500 text-white rounded-full h-4 w-4 ml-2 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20"
                     fill="currentColor">
                    <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm1 12h-2v-2h2v2zm0-3h-2V7h2v4z"/>
                </svg>
            </button>
            <div className="opacity-0 text-xs bg-gray-600 pointer-events-none w-52 absolute -top-7 text-justify tracking-wider left-8 rounded-md shadow-md p-2
                                 text-white transition-opacity duration-300 group-hover:opacity-100">
                {text}
                <br/>
                <span className="font-bold text-black">{bold}</span>
            </div>
        </div>
    );
};

export default Tooltip;