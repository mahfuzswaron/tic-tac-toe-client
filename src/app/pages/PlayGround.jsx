import React, { useEffect, useState } from 'react';
import Heading1 from '../components/Heading1';
import x from "../assets/x.svg";
import o from "../assets/o.svg";
import Board from '../components/Board';
import Button from "../components/Button";
import { Link, useNavigate, useParams } from 'react-router-dom';
import UseUserInfo from '../hooks/UseUserInfo';
import { getPiece, partner } from '../hooks/necessaryFns';
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000")

const PlayGround = () => {
    const [user, userloading, firebaseLoading] = UseUserInfo();
    const [game, setGame] = useState({});
    const [canMove, setCanMove] = useState(false);
    const [loading, setLoading] = useState(false);
    const [locked, setLocked] = useState(false);
    const id = useParams().id;
    const navigate = useNavigate();
    const fetchGame = (gameId, joinRoom) => {
        setLoading(true);
        fetch(`http://localhost:5000/get-game/${gameId}`).then(res => res.json()).then(game => {
            if (game) {
                setGame(game)
                return setLoading(false)
            }
        });
    }
    // initialize game and join room by game id
    useEffect(() => {
        socket.emit("join_room", id);
        fetchGame(id)
    }, [id])

    // listen to opponent's move 
    useEffect(() => {
        socket.on("get_move", (data) => {
            fetchGame(data.gameId)
        })
    }, [socket])

    // update moving access and board lock
    useEffect(() => {
        if (game.move === user?.username) {
            setCanMove(true)
            setLocked(false)
        }
        else {
            setCanMove(false)
            setLocked(true)
        }
    }, [game.move, user.username])

    if (loading || userloading || firebaseLoading || !user?._id || !game._id) {
        return <p> Loading... </p>
    }
    console.log(new Date().getMinutes(), canMove)
    const piece = getPiece(game.pieces, user.username);
    const piecePlaceholders = { x: x, o: o };
    const handleSubmit = () => {
        if (!game.status.finished && game.move === user.username) {
            fetch(`http://localhost:5000/play/${game._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(game.board)
            }).then(res => res.json()).then(data => {
                if (data) {
                    setCanMove(false)
                    socket.emit("set_move", { gameId: game._id, message: `${user.username} has moved` });
                }
            })
        }
        else {
            navigate("/new-game");
        }

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
                <Heading1>Game with {partner(Object.values(game.players), user.username)} </Heading1>
                <p className='text-[14px] my-2'>Your Piece</p>
                <img src={piecePlaceholders[piece]} alt="piece icon" />
            </div>

            {/* Game Board  */}

            <Board
                username={user.username}
                game={game}
                setGame={setGame}
                canMove={canMove}
                setCanMove={setCanMove}
                piece={piece}
                locked={locked}
                setLocked={setLocked}
            />

            <Button onClick={handleSubmit}
                btnType={`${game.status.finished ? "primary" : game.move === user?.username ? "primary" : "disabled"}`} >
                {game.status.finished ? "start a new game!" : game.move === user?.username ? "submit!" : `waiting for ${partner(Object.values(game.players), user.username)}'s move`}
            </Button>

        </div>
    );
};

export default PlayGround;