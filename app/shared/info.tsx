import React from 'react';

const Info = (props: any) => {
    return (
        <div className="col-span-12 bg-gray-200 p-4 m-4 rounded-md">
            {props.children}
        </div>
    );
};

export default Info;