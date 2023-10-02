import clientAxios from "../config/axios";

const createPaciente = async ( authToken, {name,owner,email,description,dateUp,phone,idVeterinario}) => {
    //! Send request to create a new Paciente
    return clientAxios.post('/pacientes', {
        name,
        dateUp,
        owner,
        email,
        description,
        phone,
        idVeterinario
    }, {
        headers:{
            Authorization: `Bearer ${authToken}`
        }
    })
}

export default createPaciente;