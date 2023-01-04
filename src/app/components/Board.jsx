import React, { } from 'react';
import x from "../assets/x.svg";
import o from "../assets/o.svg";
import { pronoun } from '../hooks/necessaryFns';
// import { useState } from 'react';

const Board = ({ game, setGame, canMove, setCanMove, piece, username, locked, setLocked }) => {
    const { board } = game;
    const piecePlaceholders = { x: x, o: o };
    const makeMove = k => {
        // setCanMove(false)
        setLocked(true)
        const newBoardMap = { ...board };
        newBoardMap[k] = piece;
        setGame({ ...game, board: newBoardMap });
    }
    // console.log(game)
    return (
        <div className='my-5' >
            <div className='w-full text-[19px] text-center py-3  bg-[#FFE79E]'>
                <span>
                    {/* {pronoun(game.move, username)} Move */}
                    {
                        game.status.finished ? `${game.status.message[username]}` : `${pronoun(game.move, username)} Move`
                    }
                </span>
            </div>
            <div className='grid grid-cols-3 h-[334px]'>
                {
                    Object.keys(board).map(k => <div key={k} className={`
                    p-5 bg-pri border-[#FFE79E] flex justify-center itmes-center
                    ${k === "b2" ? "border-4" : k[1] === "2" ? "border-r-4 border-l-4" : k[0] === "b" && "border-t-4 border-b-4"}
                    ${board[k] ? "pointer-events-none" : locked ? "pointer-events-none" : ""}
                    

                    `}
                        onClick={() => makeMove(k)}
                    >
                        <img className={`${k !== "" && "h-16 w-16"} `} src={piecePlaceholders[board[k]] || ""} alt=" " />
                    </div>)
                }
            </div>
        </div >
    );
};

export default Board;