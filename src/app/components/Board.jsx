import React, { } from 'react';
import x from "../assets/x.svg";
import o from "../assets/o.svg";
import xPlaceholder from "../assets/x-placeholder.svg";
import oPlaceholder from "../assets/o-placeholder.svg";
import { pronoun } from '../hooks/necessaryFns';

const Board = ({ game, setGame, setCanUndo, piece, username, locked, setLocked, sound }) => {
    const { board } = game;
    const pieceIcon = { x: x, o: o };
    const pieceIconPlaceholder = { x: xPlaceholder, o: oPlaceholder };
    const clickSound = new Audio("/clickedSound.wav");
    const makeMove = k => {
        sound && clickSound.play();
        setLocked(true)
        setCanUndo(true)
        const newBoardMap = { ...board };
        newBoardMap[k] = piece;
        setGame({ ...game, board: newBoardMap });
    }
    // console.log(game)
    return (
        <div className='my-5' >
            <div className='w-full text-[19px] text-center py-3  bg-[#FFE79E] dark:bg-[rgb(163,137,72)]'>
                <span className='dark:text-gray' >
                    {/* {pronoun(game.move, username)} Move */}
                    {
                        game.status.finished ? `${game.status.message[username]}` : `${pronoun(game.move, username)} Move`
                    }
                </span>
            </div>
            <div className='grid grid-cols-3 h-[334px]'>
                {
                    Object.keys(board).map(k => <div key={k} className={`
                    p-5 bg-pri border-[#FFE79E] dark:border-[rgb(163,137,72)] flex justify-center itmes-center
                    ${k === "b2" ? "border-4" : k[1] === "2" ? "border-r-4 border-l-4" : k[0] === "b" && "border-t-4 border-b-4"}
                    ${board[k] ? "pointer-events-none" : locked ? "pointer-events-none" : ""}
                    `}
                        onClick={() => makeMove(k)}
                    >
                        {/* `${k !== "" && "h-16 w-16"} ` */}
                        <img className={"h-16 w-16"} src={board[k] ? pieceIcon[board[k]] : pieceIconPlaceholder[piece]} alt=" " />
                    </div>)
                }
            </div>
        </div >
    );
};

export default Board;