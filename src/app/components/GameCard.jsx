import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const GameCard = ({ game, username, sound, clickSound }) => {
    const { _id, players, status, lastUpdated } = game;
    const partner = Object.values(players).find(p => p !== username);
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const makeBidigital = (num) => num > 9 ? num : "0" + num;
    const date = new Date(Date.parse(lastUpdated));
    const day = date.getDay() + 1;
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = makeBidigital(date.getMinutes())
    const hours12 = makeBidigital(hours % 12 || 12)
    const suffix = hours >= 12 ? "pm" : "am";
    const th = day === 1 ? "st" : day === 2 ? "nd" : day === 3 ? "rd" : "th"
    const dateString = `${day}${th} ${month} ${year}, ${hours12}:${minutes}${suffix}`
    return (
        <div className=' w-full p-4 rounded-lg shadow-[2px_4px_16px_0px_rgba(0,0,0,0.25)] flex flex-col space-y-2' >
            <h1 className='text-2xl font-bold' >Game with {partner} </h1>
            <p className='whitespace-pre-line ' >{status.message[username]}</p>
            <p className='text-sm'>{dateString} </p >
            <Link onClick={() => sound && clickSound.play()} to={`/play-ground/${_id}__${username}`}><Button btnType={"primary"}>{status.finished ? "View Game" : "Play!"}</Button></Link>
        </div>
    );
};

export default GameCard;