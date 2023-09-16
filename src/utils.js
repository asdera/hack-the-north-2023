import { MY_COLOR } from "./Game";

// converts position i.e. A8 to coordinate i.e [0, 0]
export function PosToCoord(position) {
    // Turn the coordinate into numbers
    let col = position.charAt(0).charCodeAt(0) - 'A'.charCodeAt(0);
    let row = 8 - parseInt(position.charAt(1));

    // flip the coordinate system if side is black
    if (MY_COLOR === "black") {
        col = 7 - col
        row = 7 - row
    }

    // Return the coordinate as an array [x, y]
    return [col, row];
}

// converts coordinate i.e [0, 0] to position i.e. A8
export function CoordToPos(x, y) {
    if (MY_COLOR === 'white') {
        let col = String.fromCharCode('A'.charCodeAt(0) + x)
        let row = String.fromCharCode('8'.charCodeAt(0) - y)
        return col + row
    } else {
        let col = String.fromCharCode('H'.charCodeAt(0) - x)
        let row = String.fromCharCode('1'.charCodeAt(0) + y)
        return col + row
    }
}