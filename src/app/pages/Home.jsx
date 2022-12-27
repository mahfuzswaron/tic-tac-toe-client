import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import GameCard from '../components/GameCard';
import Heading1 from "../components/Heading1";

const NoGameDiv = <div className=' flex-grow flex flex-col justify-center items-center my-auto max-h-min w-full'>
    <h1 className='text-6xl text-center font-bilbo mb-6' >No Games Found</h1>
    <Link className='w-full' to="/new-game"><Button btnType={"primary"} >Start a new game</Button></Link>
</div>

const Home = ({ user }) => {
    const [games, setGames] = useState([]);
    useEffect(() => {
        const url = `http://localhost:5000/all-games/${user?.username}`;
        fetch(url).then(res => res.json()).then(data => setGames(data))
    }, [user]);

    return (
        <div className='w-full min-h-screen flex flex-col relative' >
            <Heading1>Your Games</Heading1>
            {
                games.length ?
                    <>
                        <div className="grid grid-cols-1 gap-4 mt-4">
                            {
                                games.map(g => <GameCard key={g._id} game={g} user={user.username} />)
                            }
                        </div>
                        <div className='w-[124px] p-2 flex items-center space-x-2 bg-[#270F36] text-white rounded-lg fixed bottom-6 right-6 z-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-[14px] h-[14px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            <Link to="/new-game" ><span className='text-[14px]' >New Game</span></Link>
                        </div>
                    </>
                    :
                    NoGameDiv
            }
        </div>
    );
};

export default Home;