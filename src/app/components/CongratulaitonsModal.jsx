import React from 'react';
import youWon from "../assets/you_won.png"

const CongratulaitonsModal = () => {
    return (
        <div className='bg-opacity-0 z-1 fixed top-[15%] left-0 flex justify-center w-full'>
            <img className='w-[30rem]' src={youWon} alt="" />
        </div>
    );
};

export default CongratulaitonsModal;