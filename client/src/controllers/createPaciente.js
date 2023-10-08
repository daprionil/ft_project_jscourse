import clientAxios from "../config/axios";

const createPaciente = ( authToken, {name,owner,email,description,dateUp,}) => {
    //! Send request to create a new Paciente
    return clientAxios.post('/pacientes', {
        name,
        dateUp,
        owner,
        email,
        description
    }, {
        headers:{
            'Content-Type':'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
}

export default createPaciente;