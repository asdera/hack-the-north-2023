import './Customization.css';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Colors } from './Enums.js'
import chessSkins from './Appendix.js'

import { fadeAnimation, topAnimation, bottomAnimation, leftAnimation } from './animations';

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
    const cellId = props.cellId;
    const hidePieces = props.hidePieces
    const hoveredCell = props.hoveredCell
    const selectedCell = props.selectedCell
    const cellReference = props.cellReference
    const hovered = hoveredCell === cellId && hoveredCell !== -1
    const selected = selectedCell === cellId && selectedCell !== -1

    const hoveredBorderStyle = hidePieces ? { outline: `3px solid #B5B5B5`, zIndex: 5, borderRadius: '1vh' } : {};
    const selectedBorderStyle = hidePieces ? { outline: `3px solid #6B6B6B`, zIndex: 10, borderRadius: '1vh' } : {};

    // Combine the base style with the conditional border style
    let combinedStyle = props.cellStyle;

    if (selected) {
        combinedStyle = { ...props.cellStyle, ...selectedBorderStyle };
    } else if (hovered) {
        combinedStyle = { ...props.cellStyle, ...hoveredBorderStyle };
    } 

    let isWhite = false;  // Initialize to false
    const row = Math.floor(parseInt(cellId, 10) / 8);
    const col = parseInt(cellId, 10) % 8;

    // If the row and column index are either both odd or both even, then the cell is white
    if ((row % 2 === 0 && col % 2 === 0) || (row % 2 === 1 && col % 2 === 1)) {
        isWhite = true;
    }

    return (
        <motion.div className="CustomizationCell" style={combinedStyle} onClick = {props.onClick} onMouseEnter = {props.onMouseEnter}>
            {cellReference !== 'Default Tile' && (
                <motion.img style={{width: '100%', height: '100%'}} src={isWhite ? chessSkins[cellReference].whiteImage : chessSkins[cellReference].blackImage} alt='cell skin' draggable="false"/>
            )}
        </motion.div>
    )
}

// skin for customization screen
function Skin(props) {
    const selectedSide = props.selectedSide
    const skin = props.skin
    const selectedPieceSkinName = props.selectedPieceSkinName

    // const selectedBackground = selectedPieceSkinName !== '' && selectedPieceSkinName === skin.name ? { outline: `3px solid #B5B5B5`, zIndex: 5, borderRadius: '1vh' } : {};
    const selectedBackground = selectedPieceSkinName !== '' && selectedPieceSkinName === skin.name ? { backgroundColor: `#B5B5B5`, zIndex: 5, borderRadius: '1vh' } : {};
    const combinedStyle = { ...props.cellStyle, ...selectedBackground };

    return (
        <motion.div style={combinedStyle}>
            <motion.img className="SkinImage" src={selectedSide === Colors.WHITE ? chessSkins[skin.name].whiteIcon : chessSkins[skin.name].blackIcon} 
                draggable="false"
                whileHover={{ scale: 1.1 }} onClick={() => props.selectSkin(skin.name)} />
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
    const hidePieces = props.hidePieces

    // states
    const [animation, setAnimation] = useState("initial")
    const [pieceOpacity, setPieceOpacity] = useState(0)
    
    const animations = {
        initial: fadeAnimation.initial,
        enter: fadeAnimation.enter, 
        exit: fadeAnimation.exit,

        none: {
            x: 0,
            y: 0,
            opacity: 1,
            scale: pieceOpacity, 
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            }
        }, 

        hover: { 
            y: 0,
            scale: 1.15,
            opacity: pieceOpacity,
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            }
        },

        select: {
            y: '-2vh',
            opacity: 1,
            scale: pieceOpacity,
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            }
        },

        selectAndHover: {
            scale: 1.15, 
            opacity: pieceOpacity,
            y: '-3vh',
            transition: { 
                duration: 0.25,
                ease: "easeInOut"
            } 
        },
    }

    useEffect(() => {
        if (hidePieces) return
        if (selectedCell === info.cellIdx && hoveredCell === info.cellIdx) {
            setAnimation('selectAndHover')
        } else if (selectedCell === info.cellIdx) {
            setAnimation('select')
        } else if (hoveredCell === info.cellIdx) {
            setAnimation('hover')
        } else {
            setAnimation('none')
        }
    }, [selectedCell, hoveredCell, info.cellIdx, hidePieces])

    useEffect(() => {
        if (hidePieces) {
            setAnimation('exit')
            setPieceOpacity(0)
        } else {
            setAnimation('enter')
            setPieceOpacity(1)
        }
    }, [hidePieces])

    return (
        <motion.div className='CustomPiece' style={{left: `${getBoardPositionX(info.alias, selectedSide) * (100 / 8)}%`, top: `${(getBoardPositionY(info.alias) + 2) * (100 / 4)}%`, zIndex: getBoardPositionZ(info.alias)}}
            initial={animations["initial"]}  animate={animations[animation]}>
            <motion.img className='CustomPieceImage' src={skin} draggable="false"/>
        </motion.div>
    )
}

function getLayout1() {
    return {
        "pawn1": "Soilder",
        "pawn2": "Soilder",
        "pawn3": "Soilder",
        "pawn4": "Debt Collector",
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
}

function getLayoutTiles1() {
    return {
        "0": "Default Tile",
        "1": "Default Tile",
        "2": "Default Tile",
        "3": "Default Tile",
        "4": "Default Tile",
        "5": "Default Tile",
        "6": "Default Tile",
        "7": "Default Tile",
        
        "8": "Default Tile",
        "9": "Default Tile",
        "10": "Default Tile",
        "11": "Default Tile",
        "12": "Default Tile",
        "13": "Default Tile",
        "14": "Default Tile",
        "15": "Default Tile",

        "16": "Default Tile",
        "17": "Default Tile",
        "18": "Default Tile",
        "19": "Default Tile",
        "20": "Default Tile",
        "21": "Default Tile",
        "22": "Default Tile",
        "23": "Default Tile",

        "24": "Default Tile",
        "25": "Default Tile",
        "26": "Default Tile",
        "27": "Default Tile",
        "28": "Default Tile",
        "29": "Default Tile",
        "30": "Default Tile",
        "31": "Default Tile",
    }
}

function Customize({backToMainMenu}) {
    // states
    const [selectedSide, setSelectedSide] = useState(Colors.WHITE)
    const [selectedCell, setSelectedCell] = useState(-1)
    const [selectedSkin, setSelectedSkin] = useState('')
    const [hoveredCell, setHoveredCell] = useState(-1)
    const [hidePieces, setHidePieces] = useState(false)
    const [displayedPieces, setDisplayedPieces] = useState(getWhitePieces(skinToBoardMapping, selectedSide))

    // component animation fields
    const [screenFadeAnimation, setScreenFadeAnimation] = useState("enter")
    const [titleAnimation, setTitleAnimation] = useState("enter")
    const [boardAnimation, setBoardAnimation] = useState("enter")
    const [backButtonAnimation, setBackButtonAnimation] = useState("enter")

    const [layout1, setLayout1] = useState(getLayout1())
    const [layoutTiles1, setLayoutTiles1] = useState(getLayoutTiles1())

    const changePieceSkin = (pieceName, newSkin) => {
        setLayout1(prevLayout => ({
            ...prevLayout,
            [pieceName]: newSkin
        }));
    };

    const changeTileSkin = (tileName, newSkin) => {
        setLayoutTiles1(prevLayout => ({
            ...prevLayout,
            [tileName]: newSkin
        }));
    };

    // Dummy data: Replace with your own image URLs
    const defaultChessSkins = [
        {name: 'Soilder', count: -100}, 
        {name: 'Sailor', count: -100}, 
        {name: 'Cavalry', count: -100}, 
        {name: 'Medic', count: -100}, 
        {name: 'The Lieutenant', count: -100}, 
        {name: 'The General', count: -100}, 
    ]
    const loadedChessSkins = [
        {name: 'Debt Collector', count: 5}, 
        {name: 'The Mistress', count: 1}, 
        {name: 'The Boss', count: 1}, 
        {name: 'Body Guard', count: 2},
        {name: 'Hitman', count: 2},
        {name: 'Vice', count: 2}];

    const defaultChessTiles = [
        {name: 'Default Tile', count: -100}, 
    ]
    const loadedChessTiles = [
        {name: 'Brick Tile', count: 5}];

    const [allSkins, setAllSkins] = useState(defaultChessSkins.concat(loadedChessSkins))
    const [allTiles, setAllTiles] = useState(defaultChessTiles.concat(loadedChessTiles))

    const findCount = (name) => {
        const skin = allSkins.find(s => s.name === name);
        return skin ? skin.count : 0;
    };

    const decreaseCount = (name) => {
        for (let i = 0; i < allSkins.length; i++) {
            if (allSkins[i].name === name) {
                allSkins[i].count = allSkins[i].count - 1;
                break;
            }
        }
        setAllSkins([...allSkins]);
    };

    const increaseCount = (name) => {
        for (let i = 0; i < allSkins.length; i++) {
            if (allSkins[i].name === name) {
                allSkins[i].count = allSkins[i].count + 1;
                break;
            }
        }
        setAllSkins([...allSkins]);
    };

    const decreaseTileCount = (name) => {
        for (let i = 0; i < allTiles.length; i++) {
            if (allTiles[i].name === name) {
                allTiles[i].count = allTiles[i].count - 1;
                break;
            }
        }
        setAllTiles([...allTiles]);
    };

    const increaseTileCount = (name) => {
        for (let i = 0; i < allTiles.length; i++) {
            if (allTiles[i].name === name) {
                allTiles[i].count = allTiles[i].count + 1;
                break;
            }
        }
        setAllTiles([...allTiles]);
    };

    // current pieces on the board
    const pieceComponents = displayedPieces.map((piece, index) => {
        return (
            <CustomPiece key={index} info={piece} selectedSide={selectedSide} skinName={layout1[piece.alias]} 
                selectedCell={selectedCell} hoveredCell={hoveredCell} hidePieces={hidePieces}/>
        );
    })

    const getSelectedPieceType = () => {
        const selectedPiece = displayedPieces.find(piece => piece.cellIdx === selectedCell);
        return selectedPiece ? selectedPiece.type : '';
    };

    const getSelectedPieceAlias = () => {
        const selectedPiece = displayedPieces.find(piece => piece.cellIdx === selectedCell);
        return selectedPiece ? selectedPiece.alias : '';
    };

    const getSelectedPieceSkinName = () => {
        const selectedPiece = displayedPieces.find(piece => piece.cellIdx === selectedCell);
        return selectedPiece ? layout1[selectedPiece.alias] : '';
    };

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
                    cellId = {cellId}
                    cellStyle = {cellStyle} key = {cellId}
                    onMouseEnter = {() => {setHoveredCell(cellId)}}
                    onClick = {() => {setSelectedSkin(''); setSelectedCell(cellId)}}
                    selectedCell={selectedCell}
                    hoveredCell={hoveredCell}
                    hidePieces={hidePieces}
                    cellReference={layoutTiles1[String(cellId)]}/>)
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

    function filterSkinsByType(skinList, targetType) {
        return skinList.filter(skin => chessSkins.hasOwnProperty(skin.name) && chessSkins[skin.name].type === targetType);
    }

    // avaliable skins for the selected piece
    const getSkins = (skins) => {
        if (hidePieces && selectedCell === -1) return
        return skins.filter(skin => chessSkins.hasOwnProperty(skin.name)).map((skin, index) => (
            <Skin key={index} selectedSide={selectedSide} skin={skin} selectSkin={setSelectedSkin} selectedPieceSkinName={getSelectedPieceSkinName()} />
        ));
    };

    return (
        <motion.div className = 'Customization' initial={fadeAnimation["initial"]} animate={fadeAnimation[screenFadeAnimation]}>
            <motion.div className = "CustomizationTitle" initial={topAnimation["initial"]} animate={topAnimation[titleAnimation]}>
                Board</motion.div>

            <motion.div className='BoardContainer'>
                <motion.div className='ButtonGroup'>
                    <motion.div className='CustomizationButton' style={{color: hidePieces ? "#B0B0B0" : "#6B6B6B"}}
                        whileHover={{ scale: hidePieces ? 1 : 1.05 }}
                        onClick={() => {
                            if (hidePieces) return
                            if (selectedSide === Colors.WHITE) {
                                setSelectedSide(Colors.BLACK)
                            } else if (selectedSide === Colors.BLACK) {
                                setSelectedSide(Colors.WHITE)
                            }
                        }}>Swap Side</motion.div>
                    <motion.div 
                        className='CustomizationButton'
                        whileHover={{ scale: 1.1 }}
                        onClick={() => {
                            setHidePieces(!hidePieces)
                            setSelectedCell(-1)
                            setSelectedSide(Colors.BLACK)
                            setSelectedSkin('')
                        }}>{hidePieces ? 'Edit Cells' : 'Edit Pieces'}
                    </motion.div>
                </motion.div>
                <motion.div className = "MyBoard" initial={leftAnimation["initial"]} animate={leftAnimation[boardAnimation]}
                        onMouseLeave = {() => setHoveredCell(-1)}>
                    {cellComponents()}
                    {pieceComponents}
                </motion.div>
                <motion.div className='DisplayPanel'>
                    {selectedSkin != null && chessSkins.hasOwnProperty(selectedSkin) ? (
                        <div className='DisplayPanelContent'>
                            <img className='DisplayedPieceImage' draggable="false"
                                src={selectedSide === Colors.WHITE ? chessSkins[selectedSkin].whiteImage : chessSkins[selectedSkin].blackImage} alt='skin piece'/>
                            <div className='TextSmall'>
                                {selectedSkin}
                            </div>
                            <div className='TextTiny'>
                                Class: {chessSkins[selectedSkin].type}
                            </div>
                            <div className='TextTiny'>
                                Remaining: {findCount(selectedSkin) < 0 ? '--' : 'x'+findCount(selectedSkin)}
                            </div>
                            <motion.div className='TextTiny' style={{textDecoration: "underline", color: layout1[getSelectedPieceAlias()] === selectedSkin ? "#B0B0B0" : "#6B6B6B"}} 
                                whileHover={{ scale: layout1[getSelectedPieceAlias()] === selectedSkin ? 1 : 1.1 }}
                                onClick={()=>{
                                    if (hidePieces) {
                                        increaseTileCount(layoutTiles1[String(selectedCell)])
                                        changeTileSkin(selectedCell, selectedSkin)
                                        decreaseTileCount(layoutTiles1[String(selectedCell)])
                                    } else if (getSelectedPieceAlias() !== '' && selectedSkin !== '' && findCount(selectedSkin) !== 0) {
                                        increaseCount(layout1[getSelectedPieceAlias()])
                                        changePieceSkin(getSelectedPieceAlias(), selectedSkin)
                                        decreaseCount(selectedSkin)
                                    }
                                }}>Equip</motion.div>
                        </div>
                    ) : null}
                </motion.div>
            </motion.div>

            <motion.div className = "SkinContainer" initial={bottomAnimation["initial"]} animate={bottomAnimation[boardAnimation]}>
                {!hidePieces ? getSkins(filterSkinsByType(allSkins, getSelectedPieceType())) : getSkins(allTiles)}
            </motion.div>

            <motion.div className='BackButton' initial={bottomAnimation["initial"]} animate={bottomAnimation[backButtonAnimation]} 
                    onClick={() => ToMenu()} whileHover={{ scale: 1.1 }}> 
                Back </motion.div>
        </motion.div>
    )
}

export default Customize;