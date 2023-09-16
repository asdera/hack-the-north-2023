import "./Purchase.css";
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

function Purchase() {
  // The stage we are on, will be set to buyCredits, once animations finish SetPage will be called
  const [stage, setStage] = useState("store");

  // component animation fields
  const [fadeStatus, setFadeStatus] = useState("enter");
  const [titleStatus, setTitleStatus] = useState("enter");
  const [creditsListStatus, setCreditsListStatus] = useState("enter");
  const [buyButtonStatus, setBuyButtonStatus] = useState("enter");

  const BuyCredits = async () => {
    alert("You earned credits");
    setStage("purchaseSuccess");
    setFadeStatus("enter");
  };

  useEffect(() => {
    if (stage === "buyCredits") {
      setFadeStatus("exit");
      setTitleStatus("exit");
      setCreditsListStatus("exit");
      setBuyButtonStatus("exit");
      const exitTimer = setTimeout(() => {
        BuyCredits();
        clearTimeout(exitTimer);
      }, 550);
    }
  }, [stage]);

  return (
    <motion.div
      className="Store"
      initial={fadeAnimation["initial"]}
      animate={fadeAnimation[fadeStatus]}
    >
      {/* Show success message if stage is "purchaseSuccess" */}
      {stage === "purchaseSuccess" ? (
        <div className="SuccessMessage">
          Congratulations! You have successfully purchased credits.
        </div>
      ) : (
        <>
          <motion.div
            className="StoreTitle"
            initial={topAnimation["initial"]}
            animate={topAnimation[titleStatus]}
          >
            Buy Credits
          </motion.div>

          <motion.div
            className="CreditsList"
            initial={scaleAnimation["initial"]}
            animate={scaleAnimation[creditsListStatus]}
            onAnimationComplete={() => {
              if (creditsListStatus === "enter") setCreditsListStatus("final");
            }}
          >
            <div className="CreditOption">100 Credits - $5</div>
            <div className="CreditOption">250 Credits - $10</div>
            <div className="CreditOption">500 Credits - $20</div>
          </motion.div>

          <motion.div
            className="BuyButton"
            onClick={() => {
              setStage("buyCredits");
            }}
            whileHover={{ scale: 1.1 }}
            initial={leftAnimation["initial"]}
            animate={leftAnimation[buyButtonStatus]}
          >
            BUY NOW
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

export default Purchase;
