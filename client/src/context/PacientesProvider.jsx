import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider"
import clientAxios from "../config/axios";
import createPaciente from "../controllers/createPaciente";

//! Create context
const pacienteContext = createContext();
//? Share context with useContext
export const usePacientesContext = () => useContext(pacienteContext);
//! Helpers or actions context

const PacientesProvider = ({children}) => {
    const { authToken } = useAuthContext();
    const [pacientes, setPacientes] = useState([]);

    const addPaciente = (data) => createPaciente(authToken, data);

    //? When the stars app this provider will be request the pacientes by token
    useEffect(() => {
        if(authToken){
            clientAxios('/pacientes', {
                headers:{
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then(response => {
                setPacientes(response.data);
            });
        }
    },[authToken]);

    return (
        <pacienteContext.Provider value={{pacientes, addPaciente}}>
            {
                children
            }
        </pacienteContext.Provider>
    )
}

export default PacientesProvider