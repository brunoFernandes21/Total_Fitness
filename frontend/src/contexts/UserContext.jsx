import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import LoadingPage from "../components/Loading.jsx";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState(null)
  const [newPhoto, setNewPhoto] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setCurrentUser(currentUser)
        setUserName(currentUser.displayName)
        setLoading(false)
      } else {
        setLoading(false)
      }
    });
    return unsubscribe
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, userName, setUserName, newPhoto, setNewPhoto}}>
      {/* {children} */}
      {!loading && children}
      {loading && <LoadingPage/>}
    </UserContext.Provider>
  );
};
