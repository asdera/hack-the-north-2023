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
  const [currentId, setCurrentId] = useState(null);

  const authEngine = CreateAuthEngine();

  useEffect(() => {
    if (currentId) {
      const docRef = doc(firestore, "users", currentId);

      getDoc(docRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            console.log("User data:", docSnap.data());
            setCurrentUser({...docSnap.data(), id: currentId});
          } else {
            console.log("No such user!");
          }
        })
        .catch((error) => {
          console.log("Error getting user:", error);
        });
    }
  }, [currentId]);

  const newNuggetCount = (nuggetCount) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, nuggetCount });
    }
  };

  const didLogIn = (userId) => {
    setCurrentId(userId);
    // Additional logic for when a user logs in
  };

  const didRegister = (id) => {
    if (id) {
      setCurrentId(id);
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
    newNuggetCount,
    authEngine,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
