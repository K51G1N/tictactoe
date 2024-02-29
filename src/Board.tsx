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
            {Array.from({ length: 3 }).map((_, i: number) => (
                <div className="board-row" key={i}>
                    {Array.from({ length: 3 }).map((_, j: number) => {
                        const index: number = i * 3 + j;
                        return (
                        <Square
                            key={index}
                            value={squares[index]}
                            onSquareClick={() => handleClick(index)}
                        />
                        );
                    })}
                </div>
            ))} 
        </div>
    )

}