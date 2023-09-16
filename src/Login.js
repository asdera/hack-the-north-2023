import './Menu.css';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { fadeAnimation, topAnimation, bottomAnimation, leftAnimation, rightAnimation } from './animations';

function Login({DidLogIn, BackToMenu}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // component animation fields
    const [fadeStatus, setFadeStatus] = useState("enter")
    const [titleStatus, setTitleStatus] = useState("enter")
    const [usernameStatus, setUsernameStatus] = useState("enter")
    const [passwordStatus, setPasswordStatus] = useState("enter")
    const [buttonStatus, setButtonStatus] = useState("enter")

    function TransitionOut() {
        setFadeStatus('exit')
        setTitleStatus('exit')
        setUsernameStatus('exit')
        setPasswordStatus('exit')
        setButtonStatus('exit')
    }

    function ToMenu() {
        console.log(email)
        console.log(password)
        TransitionOut()
        const exitTimer = setTimeout(() => {
            BackToMenu()
            clearTimeout(exitTimer)
        }, 550);
    }

    function ToModeSelection() {
        TransitionOut()
        const exitTimer = setTimeout(() => {
            DidLogIn()
            clearTimeout(exitTimer)
        }, 550);
    }

    return (
        <motion.div className = "Menu" initial={fadeAnimation["initial"]} animate={fadeAnimation[fadeStatus]}>
            <motion.div className = "ChessWithGuns" initial={topAnimation["initial"]} animate={topAnimation[titleStatus]}>
                Login</motion.div>

            <motion.input className='InputField' spellCheck={false} draggable={false} whileHover={{ scale: 1.05 }} type={"text"}
                initial={leftAnimation["initial"]} animate={leftAnimation[usernameStatus]} 
                onInput={e => setEmail(e.currentTarget.value)} placeholder={"Email or Username"} required></motion.input>
            <motion.input className='InputField' spellCheck={false} draggable={false} whileHover={{ scale: 1.05 }} type={"password"}
                initial={rightAnimation["initial"]} animate={rightAnimation[passwordStatus]}  
                onInput={e => setPassword(e.currentTarget.value)} placeholder={"Password"} required></motion.input>
            <motion.div className='SmallButton' initial={bottomAnimation["initial"]} animate={bottomAnimation[buttonStatus]} whileHover={{ scale: 1.1 }}> 
                Recover Password </motion.div>

            <div style={{paddingTop:'7vh'}}></div>

            <motion.div className='Button' initial={bottomAnimation["initial"]} animate={bottomAnimation[buttonStatus]}
                    onClick={() => ToModeSelection()} whileHover={{ scale: 1.1 }}> 
                Login </motion.div>

            <motion.div className='BackButton' initial={bottomAnimation["initial"]} animate={bottomAnimation[buttonStatus]} 
                    onClick={() => ToMenu()} whileHover={{ scale: 1.1 }}> 
                Back </motion.div>

        </motion.div>
    );
}

export default Login;