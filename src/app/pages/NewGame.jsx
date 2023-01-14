import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Heading1 from '../components/Heading1';
import Heading2 from '../components/Heading2';
import UseUserInfo from '../hooks/UseUserInfo';
import io from "socket.io-client";
import { useEffect } from 'react';
import Loader from '../components/Loader/Loader';
const socket = io.connect("http://localhost:5000");

const NewGame = ({ sound, clickSound, setModal, setOpenModal }) => {
    const [user, loading, fireabaseLoading] = UseUserInfo();
    const [email, setEmail] = useState("");
    const [joinRoom, setJoinRoom] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        socket.emit("join_room", email)
    }, [joinRoom])
    const startGame = () => {
        sound && clickSound.play()
        setJoinRoom(true)
        if (!email) {
            setModal({
                message: "please enter a valid email first",
                buttons: [
                    { type: "primary", text: "ok", onClick: () => setOpenModal(false) }
                ]
            })
            setOpenModal(true);
            return
        }
        fetch("http://localhost:5000/start-game", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ user: user.email, partner: email })
        }).then(response => response.json()).then(result => {
            if (result.success) {
                socket.emit("set_data", { roomId: email, message: "game created" })
                navigate(`/play-ground/${result.insertedId}`)
            }
            else {
                setModal({
                    message: "user not found. please enter a valid email",
                    buttons: [
                        { type: "primary", text: "ok", onClick: () => setOpenModal(false) }
                    ]
                })
                setOpenModal(true);
            }
        })
    }
    if (loading || fireabaseLoading || !user?._id) {
        return <Loader message={"Please wait..."} />
    }

    return (
        <div className='flex flex-col h-screen animate__animated animate__fadeInDownBig' >
            <div>
                {/* BACK ARROW  */}
                <Link onClick={() => sound && clickSound.play()} to="/"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[24px] h-[24px] -ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                </Link>

                <div className='my-9' >
                    <Heading2>Start a new game</Heading2>
                    <Heading1 additionalClasses="mt-[9px] " >Whom do you want to play with?</Heading1>
                </div>
            </div>

            <div className='flex flex-col h-full justify-between' >
                {/* EMAIL  */}
                <div>
                    <Heading2 additionalClasses={'mt-4'} >Email</Heading2>
                    <input
                        type={"email"}
                        placeholder="Type their email here"
                        className={"mt-3 p-3 rounded-lg bg-gray w-full dark:border border-gray dark:bg-semiBlack"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='mb-5'>
                    <Button btnType="primary" onClick={startGame} >Start game</Button>
                </div>
            </div>

        </div>
    );
};

export default NewGame;