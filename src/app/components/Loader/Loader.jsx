import React from 'react';
import "./Loader.css";

const Loader = ({ message }) => {
    return (
        <div className='h-screen w-full flex justify-center items-center' >
            <div>
                <div className="sk-folding-cube">
                    <div className="sk-cube1 sk-cube"></div>
                    <div className="sk-cube2 sk-cube"></div>
                    <div className="sk-cube4 sk-cube"></div>
                    <div className="sk-cube3 sk-cube"></div>
                </div>
                <small>{message}</small>
            </div>
        </div>
    );
};

export default Loader;