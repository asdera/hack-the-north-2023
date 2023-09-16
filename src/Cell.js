import React from 'react';
import images from './images';
import { BOARD_SIZE } from './Game';
import { CoordToPos } from './utils'

export function initializeCells() {
    // initialization code
    const newCells = [];
    for (let i = 0; i < BOARD_SIZE; i++) {
        for (let j = 0; j < BOARD_SIZE; j++) {
            let pos = CoordToPos(j, i)
            newCells.push({position: pos, x: j, y: i, lit: false})
        }
    }
    return newCells
}

function Cell(props) {
    return (
        <div className = "Cell" style = {props.cellStyle} onClick = {props.onClick} onMouseEnter = {props.onMouseEnter}>
            <img className = "Square" src={images.predict} alt='hint' style={{ opacity: props.lit ? 1 : 0 }}/>
        </div>
    );
}

export default Cell