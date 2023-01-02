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
    const [moveCount, setMoveCount] = useState(0);
    const id = useParams().id;
    const navigate = useNavigate();
    const fetchGame = (gameId, setMovePermission, joinRoom) => {
        setLoading(true);
        fetch(`http://localhost:5000/get-game/${gameId}`).then(res => res.json()).then(game => {
            if (game) {
                setGame(game)
                setMovePermission && game.move === user?.username && setCanMove(true)
                joinRoom && socket.emit("join_room", game._id); // joining the room
                return setLoading(false)
            }
        });
    }
    useEffect(() => {
        // setLoading(true);
        // fetch(`http://localhost:5000/get-game/${id}`).then(res => res.json()).then(game => {
        //     if (game) {
        //         setGame(game)
        //         game.move === user?.username && setCanMove(true)
        //         socket.emit("join_room", game._id); // joining the room
        //         return setLoading(false)
        //     }
        // });
        fetchGame(id, true, true)

    }, [id, user, moveCount]);

    useEffect(() => {
        socket.on("get_move", (data) => {
            fetchGame(data.gameId, true, false)
        })
    }, [socket])

    if (loading || userloading || firebaseLoading || !user?._id || !game._id) {
        return <p> Loading... </p>
    }

    const piece = getPiece(game.pieces, user.username);
    const piecePlaceholders = { x: x, o: o };
    const handleSubmit = () => {
        if (!game.status.finished) {
            fetch(`http://localhost:5000/play/${game._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(game.board)
            }).then(res => res.json()).then(data => {
                if (data) {
                    setMoveCount(moveCount + 1)
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
            />

            <Button onClick={handleSubmit}
                btnType={`${game.status.finished ? "primary" : game.move === user?.username ? "primary" : "disabled"}`} >
                {game.status.finished ? "start a new game!" : game.move === user?.username ? "submit!" : `waiting for ${partner(Object.values(game.players), user.username)}'s move`}
            </Button>

        </div>
    );
};

export default PlayGround;