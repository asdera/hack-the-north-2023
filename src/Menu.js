import "./Menu.css";
import images from "./images";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

import {
  scaleAnimation,
  fadeAnimation,
  topAnimation,
  leftAnimation,
  rightAnimation,
} from "./animations";

/*
This is the unlogged in menu
*/
function Menu({ ToLogin, ToRegister }) {
  // the stage we are on, will be set to login / register, once animations finish SetPage will be called
  const [stage, setStage] = useState("menu");

  // component animation fields
  const [fadeStatus, setFadeStatus] = useState("enter");
  const [titleStatus, setTitleStatus] = useState("enter");
  const [profileStatus, setProfileStatus] = useState("enter");
  const [loginButtonStatus, setLoginButtonStatus] = useState("enter");
  const [registerButtonStatus, setRegisterButtonStatus] = useState("enter");

  useEffect(() => {
    if (stage === "login" || stage === "register") {
      setFadeStatus("exit");
      setTitleStatus("exit");
      setProfileStatus("exit");
      setLoginButtonStatus("exit");
      setRegisterButtonStatus("exit");
      const exitTimer = setTimeout(() => {
        if (stage === "login") ToLogin();
        if (stage === "register") ToRegister();
        clearTimeout(exitTimer);
      }, 550);
    }
  }, [stage, ToLogin, ToRegister]);

  return (
    <motion.div
      className="Menu"
      initial={fadeAnimation["initial"]}
      animate={fadeAnimation[fadeStatus]}
    >
      <motion.div
        className="ChessWithGuns"
        initial={topAnimation["initial"]}
        animate={topAnimation[titleStatus]}
      >
        Chess with Guns
      </motion.div>

      <motion.div
        className="Subtitle"
        initial={topAnimation["initial"]}
        animate={topAnimation[titleStatus]}
      >
        Finally, chess have received an update after a thousand years!
      </motion.div>

      <motion.div
        className="Profile"
        initial={scaleAnimation["initial"]}
        animate={scaleAnimation[profileStatus]}
        onAnimationComplete={() => {
          if (profileStatus === "enter") setProfileStatus("final");
        }}
      >
        <div className="Icon">
          <img
            className="Icon"
            src={images.defaultIcon}
            alt="Default Icon"
          ></img>
        </div>
        <div className="Info">
          <div className="Username">??????????????</div>
          <div className="TextSmall">Unknown</div>
          <div className="TextSmall">
            <motion.span
              className="ActualTextSmall"
              style={{ textDecoration: "underline" }}
            ></motion.span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="Button"
        onClick={() => {
          setStage("login");
        }}
        whileHover={{ scale: 1.1 }}
        initial={leftAnimation["initial"]}
        animate={leftAnimation[loginButtonStatus]}
      >
        LOGIN{" "}
      </motion.div>
      <motion.div
        className="Button"
        onClick={() => {
          setStage("register");
        }}
        whileHover={{ scale: 1.1 }}
        initial={rightAnimation["initial"]}
        animate={rightAnimation[registerButtonStatus]}
      >
        REGISTER{" "}
      </motion.div>
    </motion.div>
  );
}

export default Menu;
