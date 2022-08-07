import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../utils/api";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  /* const [usuario, setUsuario] = useState(null); */
  const [beUser, setBeUser] = useState(null);
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState("");

  const saveToken = (newToken) => {
    setToken(`Bearer ${newToken}`);
  };

  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUserJSON) {
      setBeUser(loggedUserJSON);
      /*  setToken("Bearer " + loggedUserJSON.token); */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loggedUser", JSON.stringify(beUser));
    setUserRole(beUser?.role || "");
  }, [beUser]);

  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        /* setUsuario(currentUser); */
      } else {
        /* setUsuario(null); */
        setBeUser(null);
      }
      setLoadingUser(false);
    });
  }, []);

  const value = {
    userRole: [userRole, setUserRole],
    loadingUser: [loadingUser, setLoadingUser],
    /*  usuario: [usuario, setUsuario], */
    beUser: [beUser, setBeUser],
    token: [token, setToken],
    saveToken: saveToken,
    logIn: logIn,
    logOut: logOut,
    loginWithGoogle: loginWithGoogle
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
