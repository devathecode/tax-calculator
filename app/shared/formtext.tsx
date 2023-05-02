import React from 'react';

const Formtext = ({text, color}: any) => {
    return (
        <div className="flex items-center">
            <hr className="flex-grow border-t border-gray-300 mr-4"/>
            <span className={`font-bold tracking-wider ${color ? color : 'text-gray-500 text-xl'}`}>{text}</span>
            <hr className="flex-grow border-t border-gray-300 ml-4"/>
        </div>
    );
};

export default Formtext;