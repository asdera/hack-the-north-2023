import React, { useState, useEffect } from 'react';
import images from './images';
import sounds from './sounds';
import { motion } from 'framer-motion';
import { PosToCoord } from './utils.js'
import { MY_COLOR, EQUIPMENTS } from './Game';

export var NUM_PIECES = 16

export function initializePieces() {
    return [
        {type: 'rook', color: 'black', position: 'A8', status: true, idx: 0, weapon: "Knife", vest: false, canCastle: true},
        {type: 'knight', color: 'black', position: 'B8', status: true, idx: 1, weapon: "Knife", vest: false, canCastle: false},
        {type: 'bishop', color: 'black', position: 'C8', status: true, idx: 2, weapon: "Knife", vest: false, canCastle: false},
        {type: 'queen', color: 'black', position: 'D8', status: true, idx: 3, weapon: "Knife", vest: false, canCastle: false},
        {type: 'king', color: 'black', position: 'E8', status: true, idx: 4, weapon: "Knife", vest: false, canCastle: true},
        {type: 'bishop', color: 'black', position: 'F8', status: true, idx: 5, weapon: "Knife", vest: false, canCastle: false},
        {type: 'knight', color: 'black', position: 'G8', status: true, idx: 6, weapon: "Knife", vest: false, canCastle: false},
        {type: 'rook', color: 'black', position: 'H8', status: true, idx: 7, weapon: "Knife", vest: false, canCastle: true},
        {type: 'pawn', color: 'black', position: 'A7', status: true, idx: 8, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'B7', status: true, idx: 9, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'C7', status: true, idx: 10, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'D7', status: true, idx: 11, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'E7', status: true, idx: 12, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'F7', status: true, idx: 13, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'G7', status: true, idx: 14, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'black', position: 'H7', status: true, idx: 15, weapon: "Knife", vest: false, canCastle: false},
        {type: 'rook', color: 'white', position: 'A1', status: true, idx: 16, weapon: "Knife", vest: false, canCastle: true},
        {type: 'knight', color: 'white', position: 'B1', status: true, idx: 17, weapon: "Knife", vest: false, canCastle: false},
        {type: 'bishop', color: 'white', position: 'C1', status: true, idx: 18, weapon: "Knife", vest: false, canCastle: false},
        {type: 'queen', color: 'white', position: 'D1', status: true, idx: 19, weapon: "Knife", vest: false, canCastle: false},
        {type: 'king', color: 'white', position: 'E1', status: true, idx: 20, weapon: "Knife", vest: false, canCastle: true},
        {type: 'bishop', color: 'white', position: 'F1', status: true, idx: 21, weapon: "Knife", vest: false, canCastle: false},
        {type: 'knight', color: 'white', position: 'G1', status: true, idx: 22, weapon: "Knife", vest: false, canCastle: false},
        {type: 'rook', color: 'white', position: 'H1', status: true, idx: 23, weapon: "Knife", vest: false, canCastle: true},
        {type: 'pawn', color: 'white', position: 'A2', status: true, idx: 24, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'B2', status: true, idx: 25, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'C2', status: true, idx: 26, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'D2', status: true, idx: 27, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'E2', status: true, idx: 28, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'F2', status: true, idx: 29, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'G2', status: true, idx: 30, weapon: "Knife", vest: false, canCastle: false},
        {type: 'pawn', color: 'white', position: 'H2', status: true, idx: 31, weapon: "Knife", vest: false, canCastle: false}]
}

// temporary piece info, like if its being hovered or selected
export function initializePieceCacheInfo() {
    return [
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false},
        {hover: false, selected: false, sourcePiece: {sourcePos: '', sourceWeapon: '', status: 1}, recoilAngle: -999, shiver: false}]
}

function GetBoundAtCoord(x, y) {
    // Assuming you have a parent element with the id "parentElement"
    const parentElement = document.getElementById('ChessBoard');

    // Create a temporary element to calculate the center position
    const tempElement = document.createElement('div');
    
    // Append the tempElement as a child of the parentElement
    parentElement.appendChild(tempElement);

    tempElement.style.width = `${100 / 8}%`
    tempElement.style.height = `${100 / 8}%`
    tempElement.style.left = `${x * (100 / 8)}%`
    tempElement.style.top = `${y * (100 / 8)}%`
    tempElement.style.position = 'absolute'
    tempElement.style.overflow = 'hidden'

    const rect = tempElement.getBoundingClientRect();

    // Remove the temporary element
    parentElement.removeChild(tempElement);

    // Calculate the center position of the image
    return rect;
}

export const transitions = {
    initial: { duration: 0 }, 
    none: { duration: 0.5 }, 
    hover: { duration: 0.25 },
    select: { duration: 0.25 },
    selectAndHover: { duration: 0.25 },
    lifted: { 
        duration: 0.15, 
        ease: "easeIn"
    },
    shadowDropped: { duration: 0.25 },
    moved: { 
        duration: 0.10,
        ease: "easeIn"
    },
    dropped: { 
        duration: 0.45,
        ease: "easeIn"
    },
    recoil: {
        duration: 0.025,
        ease: "easeIn"
    },
    shiver: {
        duration: 0.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
    },
    destroy: { 
        type: "spring",
        damping: 50,
        stiffness: 90,
        // note a 0.5 seconds of delay is added to everything so life and move can finish
        opacity: { delay: 1, duration: 1 },
        rotate: { delay: 0.55, duration: 1.5 },
        delay: 0.5, 
    },
    gunDestroy: { 
        type: "spring",
        damping: 50,
        stiffness: 90,
        // note a 0.5 seconds of delay is added to everything so life and move can finish
        opacity: { delay: 0.5, duration: 1 },
        rotate: { delay: 0.05, duration: 1.5 },
    },
}

function Piece(props) {
    const [state, setState] = useState({
        initialized: false,
        animation: "none",
        shouldAnimateMove: false,
        moveTo: { x: 0, y: 0 },
        dropTo: { x: 0, y: 0 },
        position: { x : 0, y: -5 },
        destroying: false,
        launch: { x: 0, y: 0, xRotate: 0 },
        opacity: 1,
        zIndex: 0,
        equipmentAngle: 0,
        recoilForce: 0, 
        bulletHitPlayed: false,
        canWeaponRotate: false, 
    });

    function setProperties(newProperties) {
        setState(prevState => ({
            ...prevState,
            ...newProperties,
        }));
    }

    const { info, cache, phase, dropOrder, mousePos, selectedPieceIdx, triggerShake } = props;
    const pieceId = 'piece' + info.idx
    let image = images.black_pawn

    const animations = {
        initial: {
            x: [0],
            y: [0],
            scale: [1],
            transition: transitions['initial'], 
        }, 

        none: {
            y: 0, 
            x: 0,
            scale: 1,
            transition: transitions['none'], 
        }, 

        hover: { 
            y: 0,
            scale: 1.15,
            transition: transitions['hover'], 
        },
        
        select: {
            y: '-2vh',
            scale: 1,
            transition: transitions['select'], 
        },

        selectAndHover: {
            scale: 1.15, 
            y: '-3vh',
            transition: transitions['selectAndHover'], 
        },

        lifted: { 
            scale: 1.2, 
            y: '-15vh', 
            transition: transitions['lifted'], 
        },
        
        moved: { 
            x: state.moveTo.x, 
            y: state.moveTo.y, 
            transition: transitions['moved'], 
        },

        dropped: { 
            x: state.dropTo.x, 
            y: state.dropTo.y, 
            transition: transitions['dropped'], 
        },

        shiver: {
            x: ["0%", `${Math.random()*2 - 1}%`, '0%' , `${-Math.random()*2 - 1}%`, '0%'],
            rotate: [0, -2, 0, 2, 0], 
            transition: transitions['shiver'], 
        },

        recoil: { 
            x: `${Math.cos(cache.recoilAngle) * state.recoilForce}vh`, // assuming recoilAngle is in radians
            y: `${Math.sin(cache.recoilAngle) * state.recoilForce}vh`, // assuming recoilAngle is in radians
            transition: transitions['recoil'], 
        },

        destroy: {
            opacity: 0, 
            y: state.launch.y, 
            x: state.launch.x, 
            rotate: state.launch.xRotate * 125 + 1000 * (cache.sourcePiece.status === -1),
            transition: cache.sourcePiece.status === -1 ? transitions['gunDestroy'] : transitions['destroy'], 
        }
    };

    const shadowAnimations = {
        start: { 
            x: [0],
            y: [0],
            scale: [0],
            opacity: [0],
            transition: transitions['start'], 
        },
        
        initial: {
            x: [0],
            y: [0],
            scale: [1],
            opacity: [1],
            transition: transitions['initial'], 
        }, 

        none: {
            y: 0, 
            x: 0,
            scale: 1,
            opacity: 1,
            transition: transitions['none'], 
        }, 

        hover: { 
            y: 0,
            scale: 1,
            opacity: 1,
            transition: transitions['hover'], 
        },
        
        select: {
            y: 0,
            opacity: 1,
            transition: transitions['select'], 
        },

        selectAndHover: {
            y: 0,
            opacity: 1,
            transition: transitions['selectAndHover'], 
        },
        
        moved: { 
            x: state.moveTo.x, 
            y: state.moveTo.y, 
            transition: transitions['moved'], 
        },

        lifted: { 
            scale: 1.3,
            opacity: 0.5,
            transition: transitions['lifted'], 
        },

        prelifted: { 
            x: [0],
            y: [0],
            scale: [0],
            opacity: [0],
            transition: transitions['prelifted'], 
        },

        dropped: { 
            scale: [0, 0.5, 1],
            opacity: [0, 0.6, 1],
            transition: transitions['dropped'], 
        }, 

        recoil: { 
            x: `${Math.cos(cache.recoilAngle) * state.recoilForce}vh`, // assuming recoilAngle is in radians
            y: `${Math.sin(cache.recoilAngle) * state.recoilForce}vh`, // assuming recoilAngle is in radians
            transition: transitions['recoil'], 
        },

        shiver: {},
        destroy: {},
    };

    if (info.color === 'white') {
        if (info.type === 'pawn') image = images.white_pawn
        else if (info.type === 'rook') image = images.white_rook
        else if (info.type === 'knight') image = images.white_knight
        else if (info.type === 'bishop') image = images.white_bishop
        else if (info.type === 'queen') image = images.white_queen
        else if (info.type === 'king') image = images.white_king
    } else {
        if (info.type === 'pawn') image = images.black_pawn
        else if (info.type === 'rook') image = images.black_rook
        else if (info.type === 'knight') image = images.black_knight
        else if (info.type === 'bishop') image = images.black_bishop
        else if (info.type === 'queen') image = images.black_queen
        else if (info.type === 'king') image = images.black_king
    }

    // Run the lifted, moved, and placed animations if shouldAnimateMove is true.
    useEffect(() => {
        if (state.shouldAnimateMove) {
            setProperties({
                animation: 'lifted',
            })
        }
    }, [state.shouldAnimateMove]);

    useEffect(() => {
        if (state.animation === 'lifted') {
            const timer1 = setTimeout(() => {
                let [ newX, newY ] = PosToCoord(info.position)
                let newRect = GetBoundAtCoord(newX, newY)
                let oldRect = GetBoundAtCoord(state.position.x, state.position.y)
                if (!state.initialized) {
                    // random drop order is predetermined in the initialization phase in Game.js
                    let randomTimer = dropOrder * 75; 
                    if (info.color === MY_COLOR) randomTimer += 1500
                    const randomDrop = setTimeout(() => {
                        setProperties({
                            dropTo: { x: newRect.left - oldRect.left, y: newRect.top - oldRect.top },
                        })
                        clearTimeout(randomDrop)
                    }, randomTimer);
                } else {
                    sounds.pieceLift.play();
                    setProperties({
                        moveTo: { x: newRect.left - oldRect.left, y: newRect.top - oldRect.top },
                    })
                }
                clearTimeout(timer1);
            }, transitions['lifted']['duration'] * 1000 + 250);
        }
    }, [state.animation, info.position, state.position.x, state.position.y, state.initialized, info.color, dropOrder]);

    // after the moveTo value field changes, change the move animation
    useEffect(() => {
        setProperties({
            animation: 'moved',
        })
    }, [state.moveTo]);

    // after the dropTo value field changes, change the drop animation
    useEffect(() => {
        setProperties({
            animation: 'dropped'
        })
    }, [state.dropTo]);

    useEffect(() => {
        if (phase !== 'init') {
            setProperties({
                initialized: true,
            })
        } 
        if (phase !== 'fire') {
            setProperties({
                canWeaponRotate: false,
            })
        }
    }, [phase]);

    // prevent weird flick ui glitch when firing phase first start
    useEffect(() => {
        if (phase === 'fire' && !state.canWeaponRotate) {
            setProperties({
                canWeaponRotate: true,
            })
        }
    }, [mousePos.x, mousePos.y, phase, state.canWeaponRotate])

    // capture init phase
    useEffect(() => {
        let [ newX, newY ] = PosToCoord(info.position)
        if (!state.initialized) {
            if (info.color === MY_COLOR) {
                setProperties({
                    position: { x : newX, y: -5 },
                    zIndex: 11 + newY * 3
                })
            } else {
                setProperties({
                    position: { x : newX, y: -10 },
                    zIndex: 11 + newY * 3
                })
            }
        }
    }, [state.initialized, info.position, info.color]);

    // capture positional change
    useEffect(() => {
        let [ newX, newY ] = PosToCoord(info.position)
        if (newX !== state.position.x || newY !== state.position.y) {
            setProperties({
                shouldAnimateMove: true,
            })
        }
    }, [info.position, state.position.x, state.position.y]);

    // Handle hover and select animations.
    useEffect(() => {
        if (state.destroying || cache.shiver) {
            return
        }
        if (cache.selected && cache.hover) {
            setProperties({
                animation: 'selectAndHover'
            })
        } else if (cache.selected) {
            setProperties({
                animation: 'select'
            })
        } else if (cache.hover) {
            setProperties({
                animation: 'hover'
            })
        } else {
            setProperties({
                animation: 'none'
            })
        }
    }, [cache.selected, cache.hover, state.destroying, cache.shiver]);

    // handles destruction by knife
    useEffect(() => {
        if (cache.sourcePiece.sourcePos !== '' && cache.sourcePiece.status === 0 && !state.destroying) {
            setProperties({
                destroying: true,
            })
            // knife action
            // shake the screen, shake needs to be calculated here due to state handling difficulty
            let [ x, y ] = PosToCoord(cache.sourcePiece.sourcePos)
            let launchAngle = Math.atan2(state.position.y - y, state.position.x - x)
            let launchDist = (Math.sqrt((state.position.x - x) * (state.position.x - x) + (state.position.y - y) * (state.position.y - y)))
            const timer = setTimeout(() => {
                triggerShake({angle: launchAngle, force: launchDist + 2});
                clearTimeout(timer);
            }, 500);
        }
    }, [cache.sourcePiece.sourcePos, cache.sourcePiece.status, state.position.x, state.position.y, state.destroying, triggerShake]);

    // handles destruction by gun
    useEffect(() => {
        if (info.status === false && cache.sourcePiece.sourcePos !== '' && cache.sourcePiece.sourceWeapon !== ''
                && cache.sourcePiece.status === -1 && !state.destroying) {
            setProperties({
                destroying: true,
            })
        }
    }, [cache.sourcePiece.sourcePos, cache.sourcePiece.sourceWeapon, cache.sourcePiece.status, state.destroying, info.status]);

    useEffect(() => {
        if (cache.sourcePiece.sourcePos !== '' && cache.sourcePiece.sourceWeapon !== '' && cache.sourcePiece.status !== 1 
                && state.destroying) {
            let [ x, y ] = PosToCoord(cache.sourcePiece.sourcePos)
            const vh = window.innerHeight * 0.01; // 1vh in pixels
            // launch force by gun first
            let launchForce = EQUIPMENTS.find((equipment) => equipment.name === cache.sourcePiece.sourceWeapon).hitForce * vh
            // overwrite with knife force calculated dynamically
            if (cache.sourcePiece.status === 0) {    
                let launchDist = (Math.sqrt((state.position.x - x) * (state.position.x - x) + (state.position.y - y) * (state.position.y - y)))
                if (launchDist < 2) launchDist = 2 
                launchForce = 1.5 * 15 * vh * launchDist
            }
            let launchAngle = Math.atan2(state.position.y - y, state.position.x - x);

            // Calculate x and y based on launch force and angle
            const launchX = launchForce * Math.cos(launchAngle);
            const launchY = launchForce * Math.sin(launchAngle);
            const rotatingSide = x < state.position.x ? 1 : -1

            setProperties({
                launch: {x: launchX, y: launchY, xRotate: rotatingSide},
            })
        }
        let weapon = EQUIPMENTS.find((equipment) => equipment.name === info.weapon)
        setProperties({
            recoilForce: weapon.recoil
        })
    }, [state.destroying, cache.sourcePiece.sourcePos, cache.sourcePiece.sourceWeapon, cache.sourcePiece.status, state.position.x, state.position.y, info.weapon]);

    useEffect(() => {
        if (cache.sourcePiece.status !== 1 && state.destroying && !state.bulletHitPlayed) {
            setProperties({
                animation: 'destroy',
                bulletHitPlayed: true
            })
            if (cache.sourcePiece.status === -1) {
                const timer = setTimeout(() => {
                    const randomSound = Math.floor(Math.random() * 4) + 1;
                    if (randomSound === 1) sounds.bulletHit1.play()
                    else if (randomSound === 2) sounds.bulletHit2.play()
                    else if (randomSound === 3) sounds.bulletHit3.play()
                    else sounds.bulletHit4.play()
                    clearTimeout(timer);
                }, 100);
            } else if (cache.sourcePiece.status === 0) {
                // sounds.knifeStab.play()
            }
        }
    }, [state.launch, state.destroying, cache.sourcePiece.status, state.bulletHitPlayed]);

    
    useEffect(() => {
        if (cache.recoilAngle !== -999) {
            setProperties({
                animation: 'recoil',
            })
        }
    }, [cache.recoilAngle]);

    useEffect(() => {
        if (info.status) {
            if (cache.shiver) {
                setProperties({
                    animation: 'shiver',
                })
            } else {
                setProperties({
                    animation: 'none',
                })
            }
        }
    }, [cache.shiver, info.status]);

    // EQUIPMENT CALCULATION

    useEffect(() => {
        if (phase === 'fire' && (selectedPieceIdx !== -1 && selectedPieceIdx === info.idx)) {
            const rect = GetBoundAtCoord(state.position.x, state.position.y);

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2 - rect.height / 4; // subtracting the offset for animation

            let tempAngle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);

            // Update the current angle
            setProperties({
                equipmentAngle: tempAngle,
            });
        }
    }, [state.equipmentAngle, phase, selectedPieceIdx, info.idx, mousePos.x, mousePos.y, state.position.x, state.position.y]);

    let z = state.zIndex + 2;
    if (state.equipmentAngle < 0) z = state.zIndex - 1;

    const scaleYFactor = (state.equipmentAngle > -Math.PI / 2 && state.equipmentAngle < Math.PI / 2) ? 1 : -1;
    // note recoil angle = -999 is used to determine the delay animation after gun fires
    const recoilScaleYFactor = (cache.recoilAngle > -Math.PI / 2 && cache.recoilAngle < Math.PI / 2) ? -1 : 1;
    const scaleValue = 2.75;

    const equiptmentAction = EQUIPMENTS.find((equipment) => equipment.name === info.weapon);

    const isIdle = (phase !== 'fire' || selectedPieceIdx === -1 || selectedPieceIdx !== info.idx || !state.canWeaponRotate) && cache.recoilAngle === -999;
    const idleAngle = info.color === MY_COLOR ? equiptmentAction.idleAngle : Math.PI - equiptmentAction.idleAngle;
    const idleYScale = info.color === MY_COLOR ? scaleValue : -scaleValue;

    const equipmentStyle = {
        zIndex: isIdle ? (info.color === MY_COLOR ? state.zIndex - 1 : z) : z,
        opacity: info.status ? 1 : 0,
        transform:
            `rotate(${ isIdle ? idleAngle : (cache.recoilAngle !== -999 ? cache.recoilAngle + Math.PI : state.equipmentAngle) }rad) 
            scaleY(${ isIdle ? idleYScale : (cache.recoilAngle !== -999 ? recoilScaleYFactor * scaleValue : scaleYFactor * scaleValue) }) 
            scaleX(${ scaleValue })`
    };
    
    let [ , y ] = PosToCoord(info.position)
    const shadowY = state.position.y < 0 ? y : state.position.y
    const shadowAnim = state.position.y < 0 && state.animation === 'lifted' ? 'prelifted' : state.animation

    return (
        <div>
            <motion.div className='Piece'
                    style={{ display: state.animation === 'start' || !info.status ? "none" : "flex",
                    left: `${state.position.x * (100 / 8)}%`, top: `${shadowY * (100 / 8)}%`}}
                    animate={shadowAnimations[shadowAnim]} transition={shadowAnimations[shadowAnim]['transition']}>
                <img className='PieceImage' src={images.pieceShadow} alt='shadow'/>
            </motion.div>
            <motion.div className='Piece'
                    style={{left: `${state.position.x * (100 / 8)}%`, top: `${state.position.y * (100 / 8)}%`, 
                    transformOrigin: "center calc(100% - 75%)", 
                    zIndex: state.position.y < 0 ? state.position.y + 20 : state.position.y + 10, opacity: state.opacity}} id = {pieceId}
                    animate={animations[state.animation]} transition={animations[state.animation]['transition']}
                    onAnimationComplete={() => {
                        if (state.animation === 'moved') {
                            sounds.piecePlace.play();
                        } 
                        if (state.animation === 'dropped') {
                            sounds.piecePlace.play();
                        } 
                        if (state.animation === 'moved' || state.animation === 'dropped') {
                            let [ newX, newY ] = PosToCoord(info.position)
                            setProperties({
                                position: { x: newX, y: newY },
                                shouldAnimateMove: false,
                                zIndex: 11 + newY * 3, 
                                animation: 'initial',
                            })
                        } else if (state.animation === 'destroy') {
                            setProperties({
                                opacity: 0,
                            })
                        } else if (state.animation === 'recoil') {
                            setProperties({
                                animation: 'none',
                            })
                        }
                    }}>
                <img className='PieceImage' style={{zIndex: state.zIndex}} src={image} alt='piece'/>
                <motion.img className = "ShieldImage" 
                    style={{display: info.vest ? 'flex' : 'none', zIndex: isIdle ? (info.color === MY_COLOR ? state.zIndex - 1 : z) : z}}
                    src = {info.color === 'white' ? images.white_shield_active : images.black_shield_active} 
                    alt = "Shield" >
                </motion.img>
                <motion.img className = "EquipEquipment" 
                    style = {equipmentStyle}
                    src = {equiptmentAction.actionIcon} 
                    alt = "Rotating Icon" >
                </motion.img>
            </motion.div>
        </div>
    );
}

export default Piece