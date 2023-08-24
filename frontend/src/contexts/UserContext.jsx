import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser)
        setUserName(currentUser.displayName)
        setLoading(false)
      }
    });
    return unsubscribe
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, userName, setUserName, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};
