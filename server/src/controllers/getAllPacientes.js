const CustomError = require('../TypeErrors/CustomError');
const ModelPaciente = require('../models/Paciente.js');

const getAllPacientes = async (idVeterinario) => {
    //! If the cliente not send a idVeterinario
    if(!idVeterinario) throw CustomError.NotFoundError('No existe un parámetro [ idVeterinario ]');

    //! Search all pacientes by idVeterinario
    const pacientes = await ModelPaciente.find().where('idVeterinario').equals(idVeterinario);
    
    return pacientes;
};

module.exports = getAllPacientes;