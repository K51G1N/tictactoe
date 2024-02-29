
import React from 'react';

import { useState } from 'react';

interface SquareProps {
    value: string;
    onSquareClick: () => void;
}

export default function Square({value, onSquareClick}: SquareProps) {

    return(
            <button className={`square ${value}`} onClick={onSquareClick}>
            {value}
        </button>
    ) 
}