import React from 'react';

const Errormessage = ({errorText} : any) => {
    return (
        <p className="text-red-500 text-xs italic mt-2">{errorText}.</p>
    );
};

export default Errormessage;