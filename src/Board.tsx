import { useState } from "react";


import Square from "./Square";
import { on } from "events";

interface BoardProps {
    xIsNext: boolean;
    squares: string[];
    onPlay: (nextSquares: string[])=> void;
}

export default function Board({xIsNext, squares, onPlay}: BoardProps){

    function handleClick (i: number) {
        const nextSquares = squares.slice();
        if(squares[i] || calculateWinner(squares)){
            return;
        }

        if(xIsNext) {
            nextSquares[i] = "X";
        } else {
            nextSquares[i] = "O";
        }
        onPlay(nextSquares);
    }

    function calculateWinner(squares: string[]){

        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        for(const line of lines) {
            const [a,b,c] = line
                if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                    return squares[a];
                }
        }
        return null;
    }

    const winner = calculateWinner(squares);
    let status;
    if(winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next Player: " + (xIsNext ? "X" : "O");
    }
    
    return (
        <div>
            <div className="status">{status}</div>
            <div className='board-row'>
                < Square value={squares[0]} onSquareClick={() => handleClick(0)} />
                < Square value={squares[1]} onSquareClick={() => handleClick(1)} />
                < Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className='board-row'>
                < Square value={squares[3]} onSquareClick={() => handleClick(3)} />
                < Square value={squares[4]} onSquareClick={() => handleClick(4)} />
                < Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className='board-row'>
                < Square value={squares[6]} onSquareClick={() => handleClick(6)} />
                < Square value={squares[7]} onSquareClick={() => handleClick(7)} />
                < Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </div>
    )

}