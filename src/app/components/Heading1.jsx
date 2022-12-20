import React from 'react';

const Heading1 = ({ children, additionalClasses }) => {
    return (
        <h1 className={"text-[28px] leading-8 font-Epilogue font-bold " + additionalClasses} >
            {children}
        </h1 >
    );
};

export default Heading1;