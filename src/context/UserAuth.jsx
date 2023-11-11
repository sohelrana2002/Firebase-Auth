import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'

const userAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // const signUp = (email, password) =>{
    //     return createUserWithEmailAndPassword(auth, email, password);
    // };

    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };

    useEffect(() =>{
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
        return () =>{
            unsubscribe();
        };
    }, [])


    const sendValue = {
        ...user,
        signUp,
    }

    return (
        <userAuthContext.Provider value={sendValue}>
            {children}
        </userAuthContext.Provider>
    )
};

const useUserAuth = () =>{
    return useContext(userAuthContext);
}


export { useUserAuth, UserAuthContextProvider }