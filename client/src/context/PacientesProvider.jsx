import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthProvider"
import clientAxios from "../config/axios";
import createPaciente from "../controllers/createPaciente";
import putPaciente from "../controllers/putPaciente";

//! Create context
const pacienteContext = createContext();

//? Share context with useContext
export const usePacientesContext = () => useContext(pacienteContext);

//! Helpers or actions context

//* Component
const PacientesProvider = ({children}) => {
    const { authToken } = useAuthContext();
    const [ pacientes, setPacientes ] = useState([]);
    
    //! Form control to manage it
    const [ pacienteForm, setPacienteForm ] = useState({});
    const [ modeForm, setModeForm ] = useState(false);

    //? Add new Paciente in the state
    const addPaciente = async (data) => {
        const response = await createPaciente(authToken, data);
        setPacientes(state => ([
            response.data,
            ...state
        ]))
    };

    //? Add new Paciente in the state
    const updatePaciente = async (idPaciente, dataPaciente) => {
        const response = await putPaciente(authToken, {idPaciente, dataPaciente});
        
        const {pacienteUpdated} = response.data;
        setPacientes(state => {
            return state.map(paciente => {
                if(paciente._id === pacienteUpdated._id){
                    return {
                        ...paciente,
                        ...pacienteUpdated
                    }
                }
                return paciente;
            });
        });
    };

    //? Set edit mode in form
    const setEditPaciente = (paciente) => {
        setModeForm(true);
        setPacienteForm(paciente);
    };

    //? clear edit mode in form
    const clearEditMode = () => {
        setModeForm(false);
        setPacienteForm({});
    };

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
        <pacienteContext.Provider value={{
            pacientes,
            addPaciente,
            updatePaciente,
            pacienteForm,
            setEditPaciente,
            modeForm,
            clearEditMode
        }}>
            {
                children
            }
        </pacienteContext.Provider>
    )
}

export default PacientesProvider