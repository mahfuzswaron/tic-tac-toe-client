import React from 'react';

const Button = ({ children, type, additionalClasses }) => {
    return (
        <button
            className={`text-white text-[14px] font-bold w-full py-4 rounded-lg shadow-[2px_2px_16px_0_rgba(0,0,0,0.16)]  ${type === "primary" ? "bg-primary" : "bg-secondary"} ` + additionalClasses} >
            {children}
        </button>
    );
};

export default Button;