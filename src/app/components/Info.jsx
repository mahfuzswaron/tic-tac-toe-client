import React from 'react';

const Info = ({ children, type }) => {
    return (
        <div className={`h-min px-[16px] py-[27px] rounded-lg text-white text-sm ${type === "success" ? "bg-success" : "bg-error"} `} >
            {children}
        </div>
    );
};

export default Info;