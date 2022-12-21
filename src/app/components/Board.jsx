import React, { useState } from 'react';
import x from "../assets/x.svg";
import o from "../assets/o.svg";

const Board = () => {
    const piece = "o";
    const [boardMap, setBoardMap] = useState({
        a1: "", a2: "", a3: "",
        b1: "", b2: "", b3: "",
        c1: "", c2: "", c3: ""
    });
    const piecePlaceholders = { x: x, o: o };
    const makeMove = k => {
        console.log(k)
        const newBoardMap = { ...boardMap };
        newBoardMap[k] = piece;
        setBoardMap({ ...newBoardMap })
    }
    return (
        <div className='my-5' >
            <div className='w-full text-[19px] text-center py-3  bg-[#FFE79E]'>
                <span>Your Move</span>
            </div>
            <div className='grid grid-cols-3 h-[334px]'>
                {
                    Object.keys(boardMap).map(k => <div className={`p-5 bg-pri border-[#FFE79E] flex justify-center itmes-center ${k === "b2" ? "border-4" : k[1] === "2" ? "border-r-4 border-l-4" : k[0] === "b" && "border-t-4 border-b-4"
                        } `}
                        onClick={() => makeMove(k)}
                    >
                        <img className={`${k !== "" && "h-16 w-16"} `} src={piecePlaceholders[boardMap[k]] || ""} alt=" " />
                    </div>)
                }
            </div>
        </div >
    );
};

export default Board;