import {
  getAuth,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { registerUser } from "./CreateFirebaseEngine";

// https://firebase.google.com/docs/auth/admin/errors

function CreateAuthEngine() {
  return {
    LogInWithEmailAndPassword: (email, password) => {
      return signInWithEmailAndPassword(getAuth(), email, password)
        .then((userCredential) => {
          return userCredential.user.uid;
        })
        .catch((error) => {
          console.log(error);
          switch (error.code) {
            case "auth/invalid-email":
            case "auth/invalid-password":
            case "auth/missing-password":
              throw new Error("invalid credentials");
            default:
              throw new Error("unknown");
          }
        });
    },
    // registers the user, logs them in, and sends an email verification email.
    // If the registration succeeds but the login fails (for some reason),
    // the function asynchronously returns undefined.
    // We send the email verification email on the client side since the admin SDK
    // doesn't support it
    RegisterWithEmailPasswordAndUsername: async (email, password, username) => {
      try {
        await registerUser({
          email: email,
          password: password,
          username: username,
        });
      } catch (error) {
        switch (error.code) {
          case "functions/invalid-argument":
            switch (error.message) {
              case "auth/invalid-email":
                throw new Error("invalid email");
              case "auth/invalid-password":
              case "auth/missing-password":
                throw new Error("invalid password");
              case "auth/email-already-exists":
                throw new Error("email taken");
              default:
                throw new Error("invalid credentials");
            }
          default:
            throw new Error("internal");
        }
      }

      try {
        await signInWithEmailAndPassword(getAuth(), email, password);
        await sendEmailVerification(getAuth().currentUser);
      } catch (error) {
        alert(error);
      }

      return getAuth().currentUser?.uid;
    },
  };
}

export default CreateAuthEngine;
