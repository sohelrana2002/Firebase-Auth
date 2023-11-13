import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/Firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth'

const userAuthContext = createContext();

const UserAuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const signUp = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () =>{
        return signOut(auth);
    };

    const googleSignIn = () =>{
        const googleAuthProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleAuthProvider);
    }

    useEffect(() =>{
        const unsubscribe =  onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
        return () =>{
            unsubscribe();
        };
    }, [])


    const sendValue = {
        user,
        signUp,
        logIn,
        logOut,
        googleSignIn
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