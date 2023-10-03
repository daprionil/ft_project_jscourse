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
const clearAuthToken = () => localStorage.removeItem(import.meta.env.VITE_TOKEN_SECRET_STORAGENAME);

const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState({
        confirm: null,
        token: null
    });
    
    //! Change value token to validate user
    const changeAuth = token => {
        setAuth(() => ({
            confirm: true,
            token
        }));
        setAuthToken(token);
    };
    //! Log Out User or remove token to localstorage of user
    const logOut = () => {
        setAuth({
            confirm: null,
            token: null
        });
        clearAuthToken();
    };

    //! Execute this when the app started
    useEffect(() => {
        const token = initialAuthState();
        setAuth({
            confirm: !!token,
            token: token || null
        });
    },[]);

    return (
        <AuthContext.Provider
            value={
                {
                    confirm: auth.confirm,
                    dispatch: changeAuth,
                    authToken: auth.token,
                    logOut
                }
            }
        >
            {
                children
            }
        </AuthContext.Provider>
    )
}

export default AuthProvider;