import './Customization.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Colors } from './Enums.js'
import chessSkins from './Appendix.js'

import { fadeAnimation, topAnimation, bottomAnimation, leftAnimation, rightAnimation } from './animations';

// alias is for mapping stored layout names
const skinToBoardMapping = [
    {type: 'rook', color: Colors.BLACK, position: 'A8', idx: 0, alias: 'rook1', cellIdx: 3 * 8 + 0},
    {type: 'knight', color: Colors.BLACK, position: 'B8', idx: 1, alias: 'knight1', cellIdx: 3 * 8 + 1},
    {type: 'bishop', color: Colors.BLACK, position: 'C8', idx: 2, alias: 'bishop1', cellIdx: 3 * 8 + 2},
    {type: 'queen', color: Colors.BLACK, position: 'D8', idx: 3, alias: 'queen', cellIdx: 3 * 8 + 4},
    {type: 'king', color: Colors.BLACK, position: 'E8', idx: 4, alias: 'king', cellIdx: 3 * 8 + 3},
    {type: 'bishop', color: Colors.BLACK, position: 'F8', idx: 5, alias: 'bishop2', cellIdx: 3 * 8 + 5},
    {type: 'knight', color: Colors.BLACK, position: 'G8', idx: 6, alias: 'knight2', cellIdx: 3 * 8 + 6},
    {type: 'rook', color: Colors.BLACK, position: 'H8', idx: 7, alias: 'rook2', cellIdx: 3 * 8 + 7},
    {type: 'pawn', color: Colors.BLACK, position: 'A7', idx: 8, alias: 'pawn1', cellIdx: 2 * 8 + 0},
    {type: 'pawn', color: Colors.BLACK, position: 'B7', idx: 9, alias: 'pawn2', cellIdx: 2 * 8 + 1},
    {type: 'pawn', color: Colors.BLACK, position: 'C7', idx: 10, alias: 'pawn3', cellIdx: 2 * 8 + 2},
    {type: 'pawn', color: Colors.BLACK, position: 'D7', idx: 11, alias: 'pawn4', cellIdx: 2 * 8 + 3},
    {type: 'pawn', color: Colors.BLACK, position: 'E7', idx: 12, alias: 'pawn5', cellIdx: 2 * 8 + 4},
    {type: 'pawn', color: Colors.BLACK, position: 'F7', idx: 13, alias: 'pawn6', cellIdx: 2 * 8 + 5},
    {type: 'pawn', color: Colors.BLACK, position: 'G7', idx: 14, alias: 'pawn7', cellIdx: 2 * 8 + 6},
    {type: 'pawn', color: Colors.BLACK, position: 'H7', idx: 15, alias: 'pawn8', cellIdx: 2 * 8 + 7},
    {type: 'rook', color: Colors.WHITE, position: 'A1', idx: 16, alias: 'rook1', cellIdx: 3 * 8 + 0},
    {type: 'knight', color: Colors.WHITE, position: 'B1', idx: 17, alias: 'knight1', cellIdx: 3 * 8 + 1},
    {type: 'bishop', color: Colors.WHITE, position: 'C1', idx: 18, alias: 'bishop1', cellIdx: 3 * 8 + 2},
    {type: 'queen', color: Colors.WHITE, position: 'D1', idx: 19, alias: 'queen', cellIdx: 3 * 8 + 3},
    {type: 'king', color: Colors.WHITE, position: 'E1', idx: 20, alias: 'king', cellIdx: 3 * 8 + 4},
    {type: 'bishop', color: Colors.WHITE, position: 'F1', idx: 21, alias: 'bishop2', cellIdx: 3 * 8 + 5},
    {type: 'knight', color: Colors.WHITE, position: 'G1', idx: 22, alias: 'knight2', cellIdx: 3 * 8 + 6},
    {type: 'rook', color: Colors.WHITE, position: 'H1', idx: 23, alias: 'rook2', cellIdx: 3 * 8 + 7},
    {type: 'pawn', color: Colors.WHITE, position: 'A2', idx: 24, alias: 'pawn1', cellIdx: 2 * 8 + 0},
    {type: 'pawn', color: Colors.WHITE, position: 'B2', idx: 25, alias: 'pawn2', cellIdx: 2 * 8 + 1},
    {type: 'pawn', color: Colors.WHITE, position: 'C2', idx: 26, alias: 'pawn3', cellIdx: 2 * 8 + 2},
    {type: 'pawn', color: Colors.WHITE, position: 'D2', idx: 27, alias: 'pawn4', cellIdx: 2 * 8 + 3},
    {type: 'pawn', color: Colors.WHITE, position: 'E2', idx: 28, alias: 'pawn5', cellIdx: 2 * 8 + 4},
    {type: 'pawn', color: Colors.WHITE, position: 'F2', idx: 29, alias: 'pawn6', cellIdx: 2 * 8 + 5},
    {type: 'pawn', color: Colors.WHITE, position: 'G2', idx: 30, alias: 'pawn7', cellIdx: 2 * 8 + 6},
    {type: 'pawn', color: Colors.WHITE, position: 'H2', idx: 31, alias: 'pawn8', cellIdx: 2 * 8 + 7}]

const layout1 = {
    "pawn1": "Soilder",
    "pawn2": "Soilder",
    "pawn3": "Soilder",
    "pawn4": "Soilder",
    "pawn5": "Soilder",
    "pawn6": "Soilder",
    "pawn7": "Soilder",
    "pawn8": "Soilder",

    "rook1": "Sailor", 
    "rook2": "Sailor", 
    
    "knight1": "Cavalry",
    "knight2": "Cavalry",  

    "bishop1": "Medic",
    "bishop2": "Medic",

    "queen": "The Lieutenant",
    "king": "The General",
}

function getBoardPositionX(pieceAlias, color) {
    if (pieceAlias === 'king') {
        return color === Colors.WHITE ? 4 : 3
    } else if (pieceAlias === 'queen') {
        return color === Colors.WHITE ? 3 : 4
    } else if (pieceAlias === 'rook1') {
        return 0
    } else if (pieceAlias === 'knight1') {
        return 1
    } else if (pieceAlias === 'bishop1') {
        return 2
    } else if (pieceAlias === 'rook2') {
        return 7
    } else if (pieceAlias === 'knight2') {
        return 6
    } else if (pieceAlias === 'bishop2') {
        return 5
    } else {
        const lastChar = pieceAlias.charAt(pieceAlias.length - 1);
        return parseInt(lastChar) - 1
    }
}

function getBoardPositionZ(pieceAlias) {
    return pieceAlias.startsWith("pawn") ? 10 : 11
}

function getBoardPositionY(pieceAlias) {
    return pieceAlias.startsWith("pawn") ? 0 : 1
}

function getWhitePieces(pieces, color) {
    return pieces.filter(piece => piece.color === color);
}

// cell for customization screen
function CustomCell(props) {
    return (
        <motion.div className="CustomizationCell" style={props.cellStyle} onClick = {props.onClick} onMouseEnter = {props.onMouseEnter}/>
    )
}

// skin for customization screen
function Skin(props) {
    const selectedSide = props.selectedSide
    const skin = props.skin
    return (
        <motion.div style={props.cellStyle}>
            <motion.img className="SkinImage" src={selectedSide === Colors.WHITE ? chessSkins[skin.name].whiteImage : chessSkins[skin.name].blackImage} 
                draggable="false"
                whileHover={{ scale: 1.1 }}/>
        </motion.div>
    )
}

// skin for customization screen
function CustomPiece(props) {
    const info = props.info
    const selectedSide = props.selectedSide
    const skinName = props.skinName
    const skin = selectedSide === Colors.WHITE ? chessSkins[skinName].whiteImage : chessSkins[skinName].blackImage
    const selectedCell = props.selectedCell
    const hoveredCell = props.hoveredCell

    // states
    const [hovered, setHovered] = useState(false)
    const [selected, setSelected] = useState(false)
    const [animation, setAnimation] = useState("initial")
    
    const animations = {
        initial: {
            x: [0],
            y: [0],
            scale: [1]
        }, 

        none: {
            x: 0,
            y: 0,
            scale: 1, 
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            }
        }, 

        hover: { 
            y: 0,
            scale: 1.15,
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            }
        },
        
        select: {
            y: '-2vh',
            scale: 1,
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            }
        },

        selectAndHover: {
            scale: 1.15, 
            y: '-3vh',
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            } 
        },
    }

    useEffect(() => {
        if (selectedCell === info.cellIdx && hoveredCell === info.cellIdx) {
            setAnimation('selectAndHover')
        } else if (selectedCell === info.cellIdx) {
            setAnimation('select')
        } else if (hoveredCell === info.cellIdx) {
            setAnimation('hover')
        } else {
            setAnimation('none')
        }
    }, [selectedCell, hoveredCell])

    return (
        <motion.div className='CustomPiece' style={{left: `${getBoardPositionX(info.alias, selectedSide) * (100 / 8)}%`, top: `${(getBoardPositionY(info.alias) + 2) * (100 / 4)}%`, zIndex: getBoardPositionZ(info.alias)}}
            animate={animations[animation]}>
            <motion.img className='CustomPieceImage' src={skin} draggable="false"/>
        </motion.div>
    )
}

function Customize({backToMainMenu}) {
    // states
    const [selectedSide, setSelectedSide] = useState(Colors.WHITE)
    const [selectedCell, setSelectedCell] = useState(-1)
    const [hoveredCell, setHoveredCell] = useState(-1)
    const [displayedPieces, setDisplayedPieces] = useState(getWhitePieces(skinToBoardMapping, selectedSide))

    // component animation fields
    const [screenFadeAnimation, setScreenFadeAnimation] = useState("enter")
    const [titleAnimation, setTitleAnimation] = useState("enter")
    const [boardAnimation, setBoardAnimation] = useState("enter")
    const [backButtonAnimation, setBackButtonAnimation] = useState("enter")

    // Dummy data: Replace with your own image URLs
    const loadedChessSkins = [
        {name: 'Soilder', count: 3}, 
        {name: 'Debt Collector', count: 5}, 
        {name: 'The Mistress', count: 2}, 
        {name: 'The Mistress', count: 2},
        {name: 'The Mistress', count: 2}, 
        
        {name: 'Hacked Piece', count: 2}];

    // current pieces on the board
    const pieceComponents = displayedPieces.map((piece, index) => {
        return (
            <CustomPiece key={index} info={piece} selectedSide={selectedSide} skinName={layout1[piece.alias]} 
                selectedCell={selectedCell} hoveredCell={hoveredCell}/>
        );
    })

    // creating the 4 by 8 chess board
    const cellComponents = () => {
        // initialization code
        const newCells = [];
        for (let i = 0; i < 4; i++) {
            newCells.push([])
            for (let j = 0; j < 8; j++) {
                // triditional chess grid unit is used, i.e. A8 -> row 8 column A
                const cellStyle = {
                    backgroundColor: (i + j) % 2 === 1 ? '#CBCBCB' : '#D9D9D9'
                }
                let cellId = i * 8 + j
                newCells[i].push(<CustomCell
                    cellStyle = {cellStyle} key = {cellId}
                    onMouseEnter = {() => {setHoveredCell(cellId)}}
                    onClick = {() => {setSelectedCell(cellId)}}/>)
            }
        }
        return newCells
    };

    // swap piece color
    useEffect(() => {
        setDisplayedPieces(getWhitePieces(skinToBoardMapping, selectedSide))
    }, [selectedSide])

    function ToMenu() {
        setScreenFadeAnimation('exit')
        setTitleAnimation('exit')
        setBoardAnimation('exit')
        setBackButtonAnimation('exit')
        const exitTimer = setTimeout(() => {
            backToMainMenu()
            clearTimeout(exitTimer)
        }, 550);
    }

    // avaliable skins for the selected piece
    const getSkins = (skins) => {
        return skins.filter(skin => chessSkins.hasOwnProperty(skin.name)).map((skin, index) => (
            <Skin key={index} selectedSide={selectedSide} skin={skin}/>
        ));
    };

    return (
        <motion.div className = 'Customization' initial={fadeAnimation["initial"]} animate={fadeAnimation[screenFadeAnimation]}>
            <motion.div className = "CustomizationTitle" initial={topAnimation["initial"]} animate={topAnimation[titleAnimation]}>
                Board</motion.div>

            <motion.div className = "MyBoard" initial={leftAnimation["initial"]} animate={leftAnimation[boardAnimation]}>
                {cellComponents()}
                {pieceComponents}
            </motion.div>

            <motion.div className = "SkinContainer" initial={bottomAnimation["initial"]} animate={bottomAnimation[boardAnimation]}>
                {getSkins(loadedChessSkins)}
            </motion.div>

            <motion.div className='BackButton' initial={bottomAnimation["initial"]} animate={bottomAnimation[backButtonAnimation]} 
                    onClick={() => ToMenu()} whileHover={{ scale: 1.1 }}> 
                Back </motion.div>
        </motion.div>
    )
}

export default Customize;