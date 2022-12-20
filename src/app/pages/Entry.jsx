import React from 'react';
import Button from "../components/Button";
const Entry = () => {
    return (
        <div className='' >
            <div className='font-bilbo text-center w-[156px] mx-auto mt-[148px] mb-[35px] ' >
                <h4 className='text-4xl leading-[45px] ' >async</h4>
                <h1 className='text-8xl' >tic tac toe</h1>
            </div>
            <div className='space-y-5 font-Epilogue' >
                <Button type="primary" > Login </Button>
                <Button type="secondary" > Register </Button>
            </div>
        </div>
    );
};

export default Entry;