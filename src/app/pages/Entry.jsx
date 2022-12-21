import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../components/Button";
const Entry = () => {
    return (
        <div className='' >
            <div className='font-bilbo text-center w-[156px] mx-auto mt-[148px] mb-[35px] ' >
                <h4 className='text-4xl leading-[45px] ' >async</h4>
                <h1 className='text-8xl' >tic tac toe</h1>
            </div>
            <div className=' flex flex-col space-y-5 font-Epilogue' >
                <Link to="/login" >
                    <Button btnType="primary" > Login </Button>
                </Link>
                <Link to="/register">
                    <Button btnType="secondary" > Register </Button>
                </Link>
            </div>
        </div>
    );
};

export default Entry;