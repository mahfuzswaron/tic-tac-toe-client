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
import Loader from '../components/Loader/Loader';
import ThemeSwitcher from '../components/ThemeSwitcher';
import CongratulaitonsModal from '../components/CongratulaitonsModal';
const socket = io.connect("https://tic-tac-toe-server-production-5405.up.railway.app");



const undoBtn = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-4 h-4 fill-darkGray dark:fill-gray">
    <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 01-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 010 10.75H10.75a.75.75 0 010-1.5h2.875a3.875 3.875 0 000-7.75H3.622l4.146 3.957a.75.75 0 01-1.036 1.085l-5.5-5.25a.75.75 0 010-1.085l5.5-5.25a.75.75 0 011.06.025z" clipRule="evenodd" />
</svg>

const soundBtn = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 fill-secondary">
    <path d="M10 3.75a.75.75 0 00-1.264-.546L4.703 7H3.167a.75.75 0 00-.7.48A6.985 6.985 0 002 10c0 .887.165 1.737.468 2.52.111.29.39.48.7.48h1.535l4.033 3.796A.75.75 0 0010 16.25V3.75zM15.95 5.05a.75.75 0 00-1.06 1.061 5.5 5.5 0 010 7.778.75.75 0 001.06 1.06 7 7 0 000-9.899z" />
    <path d="M13.829 7.172a.75.75 0 00-1.061 1.06 2.5 2.5 0 010 3.536.75.75 0 001.06 1.06 4 4 0 000-5.656z" />
</svg>

const muteBtn = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-5 h-5 fill-darkGray">
    <path d="M9.547 3.062A.75.75 0 0110 3.75v12.5a.75.75 0 01-1.264.546L4.703 13H3.167a.75.75 0 01-.7-.48A6.985 6.985 0 012 10c0-.887.165-1.737.468-2.52a.75.75 0 01.7-.48h1.535l4.033-3.796a.75.75 0 01.811-.142zM13.28 7.22a.75.75 0 10-1.06 1.06L13.94 10l-1.72 1.72a.75.75 0 001.06 1.06L15 11.06l1.72 1.72a.75.75 0 101.06-1.06L16.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L15 8.94l-1.72-1.72z" />
</svg>


const PlayGround = ({ sound, setSound, clickSound, setModal, setOpenModal }) => {
    // const [user, userloading, firebaseLoading] = UseUserInfo();
    const [game, setGame] = useState({});
    const [canUndo, setCanUndo] = useState(false);
    const [congrats, setCongrats] = useState(false);
    const [canMove, setCanMove] = useState(false);
    const [locked, setLocked] = useState(false);
    const [username, email, gameId] = useParams().gameParam.split("+");
    const navigate = useNavigate();
    const fetchGame = (gameId, sayCongrats) => {
        fetch(`https://tic-tac-toe-server-production-5405.up.railway.app/get-game/${gameId}`).then(res => res.json()).then(game => {
            if (game) {
                setGame(game)
                if (sayCongrats && game?.status?.finished && game.winner === username) return setCongrats(true)
            }
        });
    }
    // initialize game and join room by game id
    useEffect(() => {
        socket.emit("join_room", gameId);
        fetchGame(gameId)
        setSound(localStorage.getItem("sound") === "true");
    }, [gameId, username])

    // listen to opponent's move 
    useEffect(() => {
        socket.on("get_data", (data) => {
            fetchGame(data.roomId)
        })
    }, [socket])

    // update moving access and board lock
    useEffect(() => {
        if (game.move === username) {
            setCanMove(true)
            setLocked(false)
        }
        else {
            setCanMove(false)
            setLocked(true)
        }
    }, [game.move, username]);

    if (!game._id) return <Loader />

    const piece = getPiece(game.pieces, username);
    const piecePlaceholders = { x: x, o: o };
    const handleSubmit = () => {

        sound && clickSound.play();

        if (!locked && !game.status.finished) {
            setModal({
                message: "Make your move first",
                buttons: [
                    { type: "primary", text: "ok", onClick: () => setOpenModal(false) }
                ]
            })
            setOpenModal(true);
            return
        }
        else if (!game.status.finished && game.move === username && locked) {
            fetch(`https://tic-tac-toe-server-production-5405.up.railway.app/play/${game._id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(game.board)
            }).then(res => res.json()).then(data => {
                if (data) {
                    setCanUndo(false)
                    fetchGame(game._id, true)
                    socket.emit("set_data", { roomId: game._id, message: "move done" })
                }
            })
        }
        else {
            navigate(`/new-game/${username}+${email}`);
        }

    }
    const handleUndo = () => {
        setCanUndo(false);
        fetchGame(gameId);
        setLocked(false);
        setCanMove(true);
    }
    const handleSound = () => {
        sound || clickSound.play();
        localStorage.setItem("sound", !sound)
        setSound(!sound)
    }
    return (
        <div onClick={() => setCongrats(false)} className={`animate__animated animate__zoomIn `}>
            {/* BACK ARROW  */}
            <Link to="/" onClick={() => sound && clickSound.play()} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </Link>

            {/* HEADER */}
            <div className='mt-9 mb-2' >
                <Heading1>Game with {partner(Object.values(game.players), username)} </Heading1>
                <div className='flex justify-between items-start my-2'>
                    <div>
                        <p className='text-[14px] mb-2'>Your Piece</p>
                        <img src={piecePlaceholders[piece]} alt="piece icon" />
                    </div>
                    <div className='flex space-x-3 items-center'>
                        <button onClick={handleUndo} disabled={!canUndo}>
                            {undoBtn}
                        </button>
                        <button onClick={handleSound}>
                            {sound ? soundBtn : muteBtn}
                        </button>
                        <ThemeSwitcher />
                    </div>
                </div>
            </div>

            {/* Game Board  */}


            <Board
                username={username}
                game={game}
                setGame={setGame}
                canMove={canMove}
                setCanMove={setCanMove}
                setCanUndo={setCanUndo}
                piece={piece}
                locked={locked}
                setLocked={setLocked}
                sound={sound}
            />

            <Button onClick={handleSubmit}
                btnType={`${game.status.finished ? "primary" : canMove ? "primary" : "disabled"}`} >
                {game.status.finished ? "start a new game!" : canMove ? "submit!" : `waiting for ${partner(Object.values(game.players), username)}`}
            </Button>

            {
                congrats && <CongratulaitonsModal sound={sound} />
            }

        </div>
    );
};

export default PlayGround;