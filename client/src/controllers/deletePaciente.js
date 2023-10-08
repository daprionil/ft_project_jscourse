import clientAxios from "../config/axios"

const deletePaciente = (bearerToken, {idPaciente}) => {
    return clientAxios.delete(`/pacientes/${idPaciente}`,{
        headers:{
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    })
}

export default deletePaciente