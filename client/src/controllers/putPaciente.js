import clientAxios from "../config/axios";

const updatePaciente = async (bearerToken, {idPaciente, dataPaciente:{
    name,owner,email,description,dateUp
}}) => {
    return clientAxios.put(`/pacientes/${idPaciente}`,{
        name,
        owner,
        email,
        description,
        dateUp
    },{
        headers:{
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json'
        }
    });
};

export default updatePaciente