import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

const userAuthContext = createContext();

const userAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState("")

    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() =>{
        onAuthStateChanged(auth, (currentUser) =>{

        })
    }, [])


    return (
        <userAuthContext value={{}}>
            {children}
        </userAuthContext>
    )
};

const useUserAuth = () =>{
    return useContext(userAuthContext);
}


export { useUserAuth, userAuthContextProvider }