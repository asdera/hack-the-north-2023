
import './Menu.css';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";

import { fadeAnimation, topAnimation, bottomAnimation, leftAnimation, rightAnimation, scaleAnimation } from './animations';

/*
validation conditions
username < 18char
password < 30char
password must contain letters and numbers
non-existing email
password matches confirm password
recapcha passes
terms and condition checked

username passes profanity check (to be added)
*/
function Register({auth_engine, DidRegister, BackToMenu}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    // validation states
    const [reCapchaVerified, setReCapchaVerified] = useState(false)
    const [termsRead, setTermsRead] = useState(false)

    // component animation fields
    const [fadeStatus, setFadeStatus] = useState("enter")
    const [titleStatus, setTitleStatus] = useState("enter")
    const [leftInputFieldStatus, setLeftInputFieldStatus] = useState("enter")
    const [rightInputFieldStatus, setRightInputFieldStatus] = useState("enter")
    const [buttonButtonStatus, setBottomButtonStatus] = useState("enter")
    const [scaleStatus, setScaleStatus] = useState("enter")

    function register() {
        console.log(reCapchaVerified)
        console.log(termsRead)
        auth_engine.RegisterWithEmailPasswordAndUsername(email, password, username)
            .then(id => {
                DidRegister(id);
            })
            .catch(error => {
                switch (error.message) {
                    case "invalid email":
                        alert("invalid email");
                        break;
                    case "email taken":
                        alert("email taken")
                        break;
                    case "invalid password":
                        alert("invalid password");
                        break;
                    case "invalid credentials":
                        alert("invalid credentials");
                        break;
                    default:
                        alert("something went wrong")
                        break;
                }
            });
    }

    function VerifyReCapcha(response) {
        // capcha success given a response through the onChange
        if (response) {
            setReCapchaVerified(true)
        }
    }

    function ToMenu() {
        setFadeStatus('exit')
        setTitleStatus('exit')
        setLeftInputFieldStatus('exit')
        setRightInputFieldStatus('exit')
        setBottomButtonStatus('exit')
        setScaleStatus('exit')
        const exitTimer = setTimeout(() => {
            BackToMenu()
            clearTimeout(exitTimer)
        }, 550);
    }

    const handleCheckboxChange = (event) => {
        setTermsRead(event.target.checked)
    };

    return (
        <motion.div className = "Menu" initial={fadeAnimation["initial"]} animate={fadeAnimation[fadeStatus]}>
            <motion.div className = "ChessWithGuns" initial={topAnimation["initial"]} animate={topAnimation[titleStatus]}>
                Register</motion.div>

            <motion.input className='InputField' spellCheck={false} draggable={false} whileHover={{ scale: 1.05 }} type={"text"}
                initial={leftAnimation["initial"]} animate={leftAnimation[leftInputFieldStatus]} 
                onInput={e => setEmail(e.currentTarget.value)} placeholder={"Email"} required></motion.input>
            <motion.input className='InputField' spellCheck={false} draggable={false} whileHover={{ scale: 1.05 }} type={"text"}
                initial={rightAnimation["initial"]} animate={rightAnimation[rightInputFieldStatus]} 
                onInput={e => setUsername(e.currentTarget.value)} placeholder={"Username"} required></motion.input>
            <motion.input className='InputField' spellCheck={false} draggable={false} whileHover={{ scale: 1.05 }} type={"password"}
                initial={leftAnimation["initial"]} animate={leftAnimation[leftInputFieldStatus]} 
                onInput={e => setPassword(e.currentTarget.value)} placeholder={"Password"} required></motion.input>
            <motion.input className='InputField' spellCheck={false} draggable={false} whileHover={{ scale: 1.05 }} type={"password"}
                initial={rightAnimation["initial"]} animate={rightAnimation[rightInputFieldStatus]} 
                onInput={e => {}} placeholder={"Confirm Password"} required></motion.input>
            
            <motion.div className='TermsHolder' initial={scaleAnimation["initial"]} animate={scaleAnimation[scaleStatus]}
                    onAnimationComplete={() => {
                        if (scaleStatus === "enter")
                            setScaleStatus('final')
                    }}>
                <motion.div className='TermsLabel' whileHover={{ scale: 1.05 }}>
                    Terms & Conditions
                </motion.div>
                
                <motion.input className='TermsCheckbox'  whileHover={{ scale: 1.1 }}
                        type="checkbox"
                        checked={termsRead}
                        onChange={handleCheckboxChange}/>
            </motion.div>

            <motion.div className='Capcha' initial={scaleAnimation["initial"]} animate={scaleAnimation[scaleStatus]}
                onAnimationComplete={() => {
                    if (scaleStatus === "enter")
                        setScaleStatus('final')
                }}>
                <ReCAPTCHA className='Capcha'
                    sitekey="6Ld_cd0nAAAAADqQXNtEKHFb1K_y9gDRpCkonAUR"
                    render="explicit"
                    onChange={VerifyReCapcha}
                />
            </motion.div>

            <div style={{paddingTop:'2.5vh'}}></div>

            <motion.div className='Button' whileHover={{ scale: 1.05 }}
                initial={bottomAnimation["initial"]} animate={bottomAnimation[buttonButtonStatus]}
                onClick={register}> Register </motion.div>

            <motion.div className='BackButton' initial={bottomAnimation["initial"]} animate={bottomAnimation[buttonButtonStatus]} 
                    onClick={() => ToMenu()} whileHover={{ scale: 1.1 }}> 
                Back </motion.div>
        </motion.div>
    );
}

export default Register;