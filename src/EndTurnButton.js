import './Game.css';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function getPhaseMessage(state) {
    if (state === 'move') return 'MOVE!'
    else if (state === 'fire' || state === 'shoot') return 'FIRE!'
    else if (state === 'promote') return 'PROMOTE!'
    else if (state === 'buy') return 'End turn [Space]'
    else if (state === 'init') return '...'
    else return ''
}

function EndTurnButton(props) {
    const [initialized, setInitialized] = useState(false)
    const [animation, setAnimation] = useState('inactive')
    const [message, setMessage] = useState('')

    const animations = {
        active: {
            opacity: 1, 
            transition: {
                duration: 0.1
            }
        },

        inactive: {
            opacity: 0, 
            transition: {
                duration: 0.1
            }
        },

        flipState: {
            scale: 1.25, 
            opacity: 1, 
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }, 
        },

        disable: {
            scale: 1.25,
            opacity: 0, 
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }, 
        },

        enable: {
            scale: 1.25, 
            opacity: 1, 
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }, 
        }, 
    };

    const { phase, state, onClick } = props;

    useEffect(() => {
        if (phase !== 'init') {
            setInitialized(true)
        } 
    }, [phase])

    useEffect(() => {
        if (!initialized) return;
        if (state === 'enemy') {
            setAnimation('disable')
            const timer = setTimeout(() => {
                setMessage('')
                clearTimeout(timer);
            }, 200);
        } else if (state === 'move') {
            const timer = setTimeout(() => {
                const timer2 = setTimeout(() => {
                    setMessage(getPhaseMessage('move'))
                    clearTimeout(timer2);
                }, 200);
                setAnimation('enable')
                clearTimeout(timer);
            }, 150);
        } else {
            setAnimation('flipState')
            const timer = setTimeout(() => {
                setMessage(getPhaseMessage(state))
                clearTimeout(timer);
            }, 200);
        }
    }, [state, initialized])

    return (
        <motion.div className='EndTurn' onClick = {() => onClick()}
                initial={animations['inactive']}
                animate={animations[animation]}
                onAnimationComplete={() => {
                    if (animation === 'disable') {
                        setAnimation('inactive')
                    } else if (animation === 'enable' || animation === 'flipState') {
                        setAnimation('active')
                    } 
                }}>
            <motion.div style={{position: 'absolute'}} className='TextMedium'>{message}</motion.div>
        </motion.div>
    )
}

export default EndTurnButton