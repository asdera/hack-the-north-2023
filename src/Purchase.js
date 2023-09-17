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

const createClient = async (name, email) => {
  try {
    const response = await fetch("http://localhost:4000/createBankClient", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
      }),
    });

    // If the response is ok, proceed to extract the JSON
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error(`Server responded with a status: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error creating client:", error);
  }
};

async function requestMoney(amount, requesteeId, message, invoiceNumber) {
  try {
    const response = await fetch("http://localhost:4000/requestMoney", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        requesteeId,
        message,
        invoiceNumber,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Money request successful:", data);
    } else {
      console.log("Failed to request money:", response.statusText);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function Purchase() {
  // The stage we are on, will be set to buyCredits, once animations finish SetPage will be called
  const [stage, setStage] = useState("store");

  // component animation fields
  const [fadeStatus, setFadeStatus] = useState("enter");
  const [titleStatus, setTitleStatus] = useState("enter");
  const [creditsListStatus, setCreditsListStatus] = useState("enter");
  const [buyButtonStatus, setBuyButtonStatus] = useState("enter");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [credits, setCredits] = useState(100);

  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");

  const BuyCredits = async () => {
    // Create a new client (you could also check if they already exist)

    const clientData = await createClient(name, email);
    if (clientData.error || !clientData.id) {
      console.error(clientData.error);
      return;
    }

    console.log(clientData);
    // wait 1 second
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const requestData = await requestMoney(
      `${credits}`,
      clientData.id,
      "Buying 100 credits",
      `Invoice${Math.floor(Math.random() * 100000000)}}`
    );

    console.log("You have requested money to buy credits");
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
            {/* Updated CreditOption divs */}
            <div
              className={`CreditOption ${credits === 100 ? "selected" : ""}`}
              onClick={() => setCredits(100)}
            >
              100 Credits - $5
            </div>
            <div
              className={`CreditOption ${credits === 250 ? "selected" : ""}`}
              onClick={() => setCredits(250)}
            >
              250 Credits - $10
            </div>
            <div
              className={`CreditOption ${credits === 500 ? "selected" : ""}`}
              onClick={() => setCredits(500)}
            >
              500 Credits - $20
            </div>
          </motion.div>

          {/* Name and email input */}
          <motion.input
            className="InputField"
            type={"text"}
            initial={leftAnimation["initial"]}
            animate={leftAnimation[buyButtonStatus]}
            value={name}
            onInput={(e) => setName(e.currentTarget.value)}
            placeholder={"Name"}
          ></motion.input>
          <motion.input
            className="InputField"
            type={"text"}
            initial={rightAnimation["initial"]}
            animate={rightAnimation[buyButtonStatus]}
            value={email}
            onInput={(e) => setEmail(e.currentTarget.value)}
            placeholder={"Email"}
          ></motion.input>

          <div style={{ width: "100%", height: "40px" }} />

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
