import React, { createContext, useContext, useState, useEffect } from "react";
import CreateAuthEngine from "./CreateAuthEngine";

import { firestore } from "./CreateFirebaseEngine";
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const authEngine = CreateAuthEngine();

  useEffect(() => {
    if (currentUser) {
      const docRef = doc(firestore, "users", currentUser);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
          } else {
            console.log("No such user!");
          }
        })
        .catch((error) => {
          console.log("Error getting user:", error);
        });
    }
  }, [currentUser]);

  const didLogIn = (userId) => {
    setCurrentUser(userId);
    // Additional logic for when a user logs in
  };

  const didRegister = (id) => {
    if (id) {
      setCurrentUser(id);
      // Additional logic for when a user registers
    }
  };

  const logOut = () => {
    setCurrentUser(null);
    // Additional logic for when a user logs out
  };

  const value = {
    currentUser,
    didLogIn,
    didRegister,
    logOut,
    authEngine,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
