import React, { useEffect, useState } from 'react';
import Heading1 from '../components/Heading1';
import x from "../assets/x.svg";
import Board from '../components/Board';
import Button from "../components/Button";
import { Link, useParams } from 'react-router-dom';

const PlayGround = () => {
    const [game, setGame] = useState({});
    const [canMove, setCanMove] = useState(false);
    // const [updatedGame, setUpdatedGame] = useState({});
    const [loading, setLoading] = useState(false);
    const id = useParams().id;
    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/get-game/${id}`).then(res => res.json()).then(game => {
            if (game) {
                game.move === "arif" && setCanMove(true)
                setGame(game)
                return setLoading(false)
            }
        });

    }, [id]);

    if (loading || !game._id) {
        return <p> Loading... </p>
    }
    const handleSubmit = () => {
        console.log(game.board);

    }
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
                <Heading1>Game with </Heading1>
                <p className='text-[14px] my-2'>Your Piece</p>
                <img src={x} alt="x icon" />
            </div>

            {/* Game Board  */}

            <Board
                game={game}
                setGame={setGame}
                canMove={canMove}
                setCanMove={setCanMove}
            />

            <Button onClick={handleSubmit} btnType="primary" >Submit</Button>

        </div>
    );
};

export default PlayGround;