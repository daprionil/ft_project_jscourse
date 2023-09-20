const CustomError = require("../TypeErrors/CustomError.js");
const ModelPaciente = require("../models/Paciente.js");


const getPacienteById = async (idPaciente) => {
    //! If the cliente not send a idPaciente
    if(!idPaciente) throw CustomError.NotFoundError('No existe un parámetro [ idPaciente ]');

    //! Search all pacientes by idPaciente
    try {
        const paciente = await ModelPaciente.findById(idPaciente);
        return paciente;
    }catch(error){
        console.log(error);
    }
};

module.exports = getPacienteById;