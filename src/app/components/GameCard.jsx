import React from 'react';
import Button from './Button';

const GameCard = ({ game }) => {
    const { players, status, date } = game;
    return (
        <div className=' w-full p-4 rounded-lg shadow-[2px_4px_16px_0px_rgba(0,0,0,0.25)] space-y-4' >
            <h1 className='text-2xl font-bold' >Game with {players[1]} </h1>
            <p className='whitespace-pre-line ' >{status}</p>
            <p className='text-sm'>{date} </p >
            <Button type={"primary"}>Play!</Button>
        </div>
    );
};

export default GameCard;