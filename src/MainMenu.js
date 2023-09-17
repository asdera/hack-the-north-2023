import "./Menu.css";
import images from "./images";
import { motion } from "framer-motion";
import React, { useState } from "react";

import {
  scaleAnimation,
  fadeAnimation,
  topAnimation,
  bottomAnimation,
  leftAnimation,
  rightAnimation,
} from "./animations";
import { useAuth } from "./AuthContext";

/*
This is the unlogged in menu
*/
function MainMenu({ LogOut, SelectMode, ToCustomize, ToGatcha }) {
  // component animation fields
  const [fadeStatus, setFadeStatus] = useState("enter");
  const [titleStatus, setTitleStatus] = useState("enter");
  const [profileStatus, setProfileStatus] = useState("enter");
  const [selectButtonStatus, setSelectButtonStatus] = useState("enter");

  const { currentUser } = useAuth();

  function TransitionOut() {
    setFadeStatus("exit");
    setTitleStatus("exit");
    setProfileStatus("exit");
    setSelectButtonStatus("exit");
  }

  function BeginLogOut() {
    TransitionOut();
    const exitTimer = setTimeout(() => {
      LogOut();
      clearTimeout(exitTimer);
    }, 550);
  }

  function BeginSelectMode() {
    TransitionOut();
    const exitTimer = setTimeout(() => {
      SelectMode();
      clearTimeout(exitTimer);
    }, 550);
  }

  function BeginCustomizeMode() {
    TransitionOut();
    const exitTimer = setTimeout(() => {
      ToCustomize();
      clearTimeout(exitTimer);
    }, 550);
  }

  function BeginGatchaMode() {
    TransitionOut();
    const exitTimer = setTimeout(() => {
      ToGatcha();
      clearTimeout(exitTimer);
    }, 550);
  }

  console.log("HELLO", currentUser);

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
          <div className="Username">{currentUser?.username}</div>
          <div className="TextSmall">Scrubby</div>
          <div className="TextSmall">
            <motion.span
              className="ActualTextSmall"
              style={{ textDecoration: "underline" }}
              whileHover={{ scale: 1.05 }}
            >
              View Profile Card
            </motion.span>
          </div>
        </div>
      </motion.div>

      <div style={{ paddingTop: "3vh" }}></div>

      <motion.div
        className="Button"
        onClick={() => {
          BeginSelectMode();
        }}
        whileHover={{ scale: 1.1 }}
        initial={leftAnimation["initial"]}
        animate={leftAnimation[selectButtonStatus]}
      >
        START{" "}
      </motion.div>

      <motion.div
        className="Button"
        onClick={() => {
          BeginGatchaMode();
        }}
        whileHover={{ scale: 1.1 }}
        initial={rightAnimation["initial"]}
        animate={rightAnimation[selectButtonStatus]}
      >
        MALL{" "}
      </motion.div>

      <motion.div
        className="Button"
        onClick={() => {
          BeginCustomizeMode();
        }}
        whileHover={{ scale: 1.1 }}
        initial={leftAnimation["initial"]}
        animate={leftAnimation[selectButtonStatus]}
      >
        BOARD{" "}
      </motion.div>

      <motion.div
        className="BackButton"
        initial={bottomAnimation["initial"]}
        animate={bottomAnimation[selectButtonStatus]}
        onClick={() => BeginLogOut()}
        whileHover={{ scale: 1.05 }}
      >
        Log Out{" "}
      </motion.div>
    </motion.div>
  );
}

export default MainMenu;
