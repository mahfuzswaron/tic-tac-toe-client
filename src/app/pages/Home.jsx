import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import GameCard from '../components/GameCard';
import Heading1 from "../components/Heading1";
import UseUserInfo from '../hooks/UseUserInfo';
import io from "socket.io-client";
import Loader from '../components/Loader/Loader';
const socket = io.connect("https://tic-tac-toe-server-production-5405.up.railway.app");

const Home = ({ sound, clickSound }) => {
    const [games, setGames] = useState([]);
    const [gamesLoading, setGamesLoading] = useState(false);
    const [{ username, email, _id }, loading, fireabaseLoading] = UseUserInfo();
    const fetchGames = username => fetch(`https://tic-tac-toe-server-production-5405.up.railway.app/all-games/${username}`).then(res => res.json()).then(data => {
        setGames(data)
        return setGamesLoading(false)
    });

    useEffect(() => {
        let isMounted = true;

        if (username && games.length === 0) {
            socket.emit("join_room", username);
            fetchGames(username);
        }

        return () => isMounted = false;

    }, [username]);

    useEffect(() => {
        socket.on("get_data", () => {
            fetchGames(username)
        });
    }, [socket, username]);

    if (loading || fireabaseLoading || !_id || gamesLoading) {
        return <Loader message={"Games Loading..."} />
    }
    return (
        <div className='w-full min-h-screen flex flex-col' >
            <Heading1>Your Games</Heading1>
            {
                games.length ?
                    <div className='relative w-full'>
                        <div className="grid grid-cols-1 gap-4 mt-4 animate__animated animate__fadeInDownBig">
                            {
                                games.map(g => <GameCard key={g._id} game={g} username={username} email={email} sound={sound} clickSound={clickSound} />)
                            }
                        </div>
                        <div className='w-[124px] p-2 flex items-center space-x-2 bg-[#270F36] text-white rounded-lg fixed s_mobile:ml-[45vw] m_mobile:ml-[55vw] l_mobile:ml-[60vw] md:ml-[13.4rem] 2xl:ml-[15.9rem] bottom-6 z-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-[14px] h-[14px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <Link to={`/new-game/${username}+${email}`} ><span className='text-[14px]' onClick={() => sound && clickSound.play()} >New Game</span></Link>
                        </div>
                    </div>
                    :
                    <div className=' flex-grow flex flex-col justify-center items-center my-auto max-h-min w-full'>
                        <h1 className='text-6xl text-center font-bilbo mb-6' >No Games Found</h1>
                        <Link className='w-full' to={`/new-game/${username}+${email}`} onClick={() => sound && clickSound.play()} ><Button btnType={"primary"} >Start a new game</Button></Link>
                    </div>

            }
        </div>
    );
};

export default Home;