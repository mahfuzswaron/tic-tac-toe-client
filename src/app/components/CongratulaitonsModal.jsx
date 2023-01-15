import React, { useEffect } from 'react';
import youWon from "../assets/you_won.png"
// import tadaSound from "/Tada-sound.mp3";

const CongratulaitonsModal = ({ sound }) => {
    useEffect(() => {
        sound && new Audio("/Tada-sound.mp3").play();
    }, [])
    return (
        <div className='h-screen z-1 fixed top-[20%] left-0 flex justify-center w-full animate__animated animate__zoomInUp animate__slow'>
            <img className='w-[35rem] h-min' src={youWon} alt="" />
        </div>
    );
};

export default CongratulaitonsModal;