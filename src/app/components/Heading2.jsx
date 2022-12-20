import React from 'react';

const Heading2 = ({ children, additionalClasses }) => {
    return (
        <h6 className={'text-sm font-bold font-Epilogue leading-[14.35px]' + " " + additionalClasses} >
            {children}
        </h6>
    );
};

export default Heading2;