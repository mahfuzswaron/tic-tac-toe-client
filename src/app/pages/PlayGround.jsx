import React from 'react';
import Heading1 from '../components/Heading1';
import x from "../assets/x.svg";
import Board from '../components/Board';
import Button from "../components/Button";
import { Link } from 'react-router-dom';

const PlayGround = () => {
    return (
        <div className=''>
            {/* BACK ARROW  */}
            <Link to="/" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </Link>

            {/* HEADER */}
            <div className='mt-9 mb-2' >
                <Heading1>Game with Tanmay</Heading1>
                <p className='text-[14px] my-2'>Your Piece</p>
                <img src={x} alt="x icon" />
            </div>

            {/* Game Board  */}

            <Board />

            <Button btnType="primary" >Submit</Button>

        </div>
    );
};

export default PlayGround;