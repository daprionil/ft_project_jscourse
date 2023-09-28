import { createContext, useContext, useEffect, useState } from "react"

//! Create Context
const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

//! Create State
const initialAuthState = () => {
    return localStorage.getItem(import.meta.env.VITE_TOKEN_SECRET_STORAGENAME) || null
};

//? Generate Actions
const setAuthToken = val => localStorage.setItem(import.meta.env.VITE_TOKEN_SECRET_STORAGENAME, val);

const AuthProvider = ({ children }) => {
    const [ auth, setAuth] = useState({
        confirm: null,
        token: null
    });
    
    const changeAuth = token => {
        setAuth(() => ({
            confirm: true,
            token
        }));
        setAuthToken(token);
    };

    useEffect(() => {
        const token = initialAuthState();
        if(token){
            setAuth({
                confirm: true,
                token
            });
        }
    },[]);

    return (
        <AuthContext.Provider value={[auth.confirm, changeAuth, auth.token]}>
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider;