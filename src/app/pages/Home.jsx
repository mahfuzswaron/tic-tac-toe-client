import React from 'react';
import Button from '../components/Button';
import GameCard from '../components/GameCard';
import Heading1 from "../components/Heading1";

const NoGameDiv = <div className=' flex-grow flex flex-col justify-center items-center my-auto max-h-min w-full'>
    <h1 className='text-6xl text-center font-bilbo mb-6' >No Games Found</h1>
    <Button type={"primary"} >Start a new game</Button>
</div>

const games = [
    {
        "_id": 1,
        "players": ["mahfuz", "shahriya"],
        "status": "you've made your move! \n Waiting for them",
        "date": "20th December, 2022, 10:11pm"
    },
    {
        "_id": 2,
        "players": ["mahfuz", "shahriya"],
        "status": "you've made your move! \n Waiting for them",
        "date": "20th December, 2022, 10:11pm"
    },
]

const Home = () => {
    return (
        <div className='w-full min-h-screen flex flex-col' >
            <Heading1>Your Games</Heading1>
            {/* {NoGameDiv} */}
            <div className="grid grid-cols-1 gap-4 mt-4">
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[0]} />
                <GameCard game={games[1]} />
            </div>
        </div>
    );
};

export default Home;