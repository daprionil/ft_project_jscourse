import { createContext, useContext, useState } from "react"

//! Create Context
const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

//! Create State

//? Generate Actions


const AuthProvider = ({ children }) => {
    const [ auth, setAuth ] = useState();

    return (
        <AuthContext.Provider value={[auth]}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;