import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const GameCard = ({ game }) => {
    const { _id, players, status, date } = game;
    return (
        <div className=' w-full p-4 rounded-lg shadow-[2px_4px_16px_0px_rgba(0,0,0,0.25)] space-y-4' >
            <h1 className='text-2xl font-bold' >Game with { } </h1>
            <p className='whitespace-pre-line ' >{status}</p>
            <p className='text-sm'>{date} </p >
            <Link to={`/play-ground/${_id}`}><Button btnType={"primary"}>Play!</Button></Link>
        </div>
    );
};

export default GameCard;