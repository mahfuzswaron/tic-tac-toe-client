import React from 'react';
import Button from '../components/Button';
import Heading1 from "../components/Heading1";

const Home = () => {
    return (
        <div className='w-full min-h-screen flex flex-col' >
            <Heading1>Your Games</Heading1>
            <div className=' flex-grow flex flex-col justify-center items-center my-auto max-h-min w-full'>
                <h1 className='text-6xl text-center font-bilbo mb-6' >No Games Found</h1>
                <Button type={"primary"} >Start a new game</Button>

            </div>
        </div>
    );
};

export default Home;