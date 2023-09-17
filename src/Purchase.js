import "./Purchase.css";
import images from "./images";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Knug from "./images/icons/knug.png";

import {
  scaleAnimation,
  fadeAnimation,
  topAnimation,
  leftAnimation,
  rightAnimation,
} from "./animations";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { firestore } from "./CreateFirebaseEngine";
import { useAuth } from "./AuthContext";

const stripe_test_pk =
  "pk_test_51Nr9sZBANMvuTab7ViyDgluJsDIth8SxDB9Y7Edn4TtJ0tB8NFISOkjMf6cXnWFggadarkXJwd8WMYzVigrvr3Nh00L7TQLkLS";
const stripe_test_sk =
  "sk_test_51Nr9sZBANMvuTab7To2iJyxL2as30oYGcGcsppHdBVFiaYO8x8Sgpp14ekH2wUZSSqtUSGGIsdGJd7UMtl5MaqGM00XAhRaVt7";

const StripeCheckoutForm = ({ amount, price, BuyCredits }) => {
  const stripe = useStripe();
  const elements = useElements();

  const { currentUser, newNuggetCount } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      // Handle payment here:
      console.log("[PaymentMethod]", paymentMethod);
    }

    await new Promise((resolve) => setTimeout(resolve, 1400));

    console.log("You have purchased credits", currentUser?.id, amount);
    if (currentUser?.id) {
      updateCredits(
        currentUser.id,
        currentUser?.nuggetCount,
        amount || 100,
        newNuggetCount
      );
    }

    BuyCredits();
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button className="pay-button" type="submit" disabled={!stripe}>
        Confirm Payment of ${price / 100}
      </button>
    </form>
  );
};

const createClient = async (name, email) => {
  try {
    const response = await fetch("http://localhost:4000/createBankClient/", {
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

const stripePromise = loadStripe(stripe_test_pk);

async function updateCredits(
  userId,
  currentCredits,
  newCredits,
  newNuggetCount
) {
  const userRef = doc(firestore, "users", userId);

  console.log(`Updating credits for user ${userId}`, userRef);
  await updateDoc(userRef, {
    credits: currentCredits + newCredits,
  });
  newNuggetCount && newNuggetCount(currentCredits + newCredits);

  console.log(`Credits updated for user ${userId}`);
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
  const [credits, setCredits] = useState(50);

  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");

  const BuyCredits = async () => {
    // Create a new client (you could also check if they already exist)

    const clientData = await createClient(name, email);
    if (clientData?.error || !clientData?.id) {
      console.error(clientData?.error);
    } else {
      console.log(clientData);
      // wait 1 second
    }

    await new Promise((resolve) => setTimeout(resolve, 1100));

    const requestData = await requestMoney(
      `${credits}`,
      clientData?.id || "1234123413",
      "Buying 100 credits",
      `Invoice${Math.floor(Math.random() * 100000000)}}`
    );
    console.log(requestData);

    console.log("You have requested money to buy credits");
    setStage("paymentDone");
    setFadeStatus("enter");
  };

  useEffect(() => {
    if (stage === "buyCredits") {
      setFadeStatus("exit");
      setTitleStatus("exit");
      setCreditsListStatus("exit");
      setBuyButtonStatus("exit");
      const exitTimer = setTimeout(() => {
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
      {/* Show success message if stage is "paymentDone" */}

      <div style={{ width: "60%" }}>
        <motion.div
          className="StoreTitle"
          initial={topAnimation["initial"]}
          animate={topAnimation[titleStatus]}
          style={{ marginLeft: "40px" }}
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
            className={`CreditOption ${credits === 50 ? "selected" : ""}`}
            onClick={() => setCredits(50)}
          >
            50 Credits - $4.99
            <img src={Knug} alt="Knug" className="Knug" />
          </div>
          <div
            className={`CreditOption ${credits === 125 ? "selected" : ""}`}
            onClick={() => setCredits(125)}
          >
            125 Credits - $9.99
            <img src={Knug} alt="Knug" className="Knug" />
          </div>
          <div
            className={`CreditOption ${credits === 300 ? "selected" : ""}`}
            onClick={() => setCredits(300)}
          >
            300 Credits - $19.99
            <img src={Knug} alt="Knug" className="Knug" />
          </div>
          <div
            className={`CreditOption ${credits === 800 ? "selected" : ""}`}
            onClick={() => setCredits(800)}
          >
            800 Credits - $39.99
            <img src={Knug} alt="Knug" className="Knug" />
          </div>
        </motion.div>
      </div>
      <div className="PurchaseSection">
        {stage !== "paymentDone" ? (
          <>
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
            <Elements stripe={stripePromise}>
              <StripeCheckoutForm
                amount={credits}
                price={
                  credits === 50
                    ? 499
                    : credits === 125
                    ? 999
                    : credits === 300
                    ? 1999
                    : 3999
                }
                BuyCredits={BuyCredits}
              />
            </Elements>
          </>
        ) : (
          <div className="SuccessMessage">
            <div className="SuccessMessageTitle">Success!</div>
            <div className="SuccessMessageBody">
              You have successfully purchased {credits} credits!
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Purchase;
