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

// given the weapon and shooter's origin position, and a list of positions of the pieces that are in the trajectory
// return the index of the piece that gets hit or -1 if no hits
// positions: {idx: int, position: String}
export function UpdateShootingStatus(weapon, origin, positions) {
    let [ startX, startY ] = PosToCoord(origin)
    let closestIdx = -1
    let closestDist = 100
    let range = 0
    // list keeping track of all idxes getting hit
    let allHit = []
    if (weapon === 'Pistol' || weapon === 'Shotgun') range = 1
    else if (weapon === 'Rifle') range = 2
    else if (weapon === 'Sniper') range = 10
    positions.forEach((pos) => {
        // transform chess position to grid coordinates
        let [ x, y ] = PosToCoord(pos.position)
        // pistol have a range of 1
        let xDiff = Math.abs(x - startX)
        let yDiff = Math.abs(y - startY)
        let dist = Math.sqrt(xDiff * xDiff + yDiff * yDiff)
        // only hit the closest target
        if (xDiff <= range && yDiff <= range) {
            allHit.push(pos.idx)
            if (dist < closestDist) {
                closestDist = dist
                closestIdx = pos.idx
            }
        }
    })
    if (weapon === 'Shotgun') {
        return allHit
    } else {
        return [closestIdx]
    }
}

// gets the angle given a starting and ending point
export function getAngle(startPoint, endPoint) {
    const deltaX = endPoint.x - startPoint.x;
    const deltaY = endPoint.y - startPoint.y;
    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;
  
    // Adjust the angle to be between 0 and 360 degrees
    const adjustedAngle = (angleInDegrees + 360) % 360;
  
    return adjustedAngle;
}

// function that returns a point that is distance away from the origin given the angle
export function getPointAwayFromOrigin(originX, originY, angle, distance) {
    const angleInRadians = (angle * Math.PI) / 180;
  
    const deltaX = Math.cos(angleInRadians) * distance;
    const deltaY = Math.sin(angleInRadians) * distance;
  
    const newX = originX + deltaX;
    const newY = originY + deltaY;
  
    return { x: newX, y: newY };
}

// function to check line-rectangle intersection
export function checkLineRectIntersection(x1, y1, x2, y2, rx, ry, rw, rh) {
    const lineSlope = (y2 - y1) / (x2 - x1);
    const lineIntercept = y1 - lineSlope * x1;

    const leftY = lineSlope * rx + lineIntercept;
    const rightY = lineSlope * (rx + rw) + lineIntercept;
    const topX = (ry - lineIntercept) / lineSlope;
    const bottomX = (ry + rh - lineIntercept) / lineSlope;

    const minX = Math.min(x1, x2);
    const maxX = Math.max(x1, x2);
    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    if (
        (minX <= rx && rx <= maxX && ry <= leftY && leftY <= ry + rh) ||
        (minX <= rx + rw && rx + rw <= maxX && ry <= rightY && rightY <= ry + rh) ||
        (minY <= ry && ry <= maxY && rx <= topX && topX <= rx + rw) ||
        (minY <= ry + rh && ry + rh <= maxY && rx <= bottomX && bottomX <= rx + rw)
    ) {
        return true; // Line intersects the rectangle
    }

    return false; // Line does not intersect the rectangle
}

// returns true if point is in rectangle
export function isPointInRectangle(point, rectangle) {
    const [x, y] = point;
    const [rx, ry, w, h] = rectangle;

    return x >= rx && x <= rx + w && y >= ry && y <= ry + h;
}

export function getPhaseMessage(phase) {
    if (phase === 'move') return 'Make a move!'
    else if (phase === 'fire' || phase === 'shoot') return 'FIRE to the cursor!'
    else if (phase === 'promote') return 'Select promotion!'
    else if (phase === 'buy') return 'End turn [Space]'
    else if (phase === 'init') return '...'
}

// Function to shuffle an array
export function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle
    while (0 !== currentIndex) {
        // Pick a remaining element
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


export function generateKnifeFightMove(type, oldPos, newPos) {
    return `${type} ${oldPos} ${newPos}`
}

export function generateKnifeFightDefaultPrompt(opponentColor, type, oldPos, newPos) {
    return `Assume you are a chess bot with color ${opponentColor} and I am ${opponentColor === 'black' ? 'white' : 'black'}. The chess board starts with proper chess positions. Only respond in the format of 'type' 'old position' 'new position' and nothing else, for example pawn A2 A3, which means pawn at A2 move to A3. I go first. ${generateKnifeFightMove(type, oldPos, newPos)}`
}

export default PosToCoord