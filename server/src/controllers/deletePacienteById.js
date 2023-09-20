const CustomError = require("../TypeErrors/CustomError");
const ModelPaciente = require("../models/Paciente");

async function deletePacienteById(idPaciente){
    if(!idPaciente) throw CustomError.NotFoundError('No existe un id de paciente para Eliminar');
    
    try {
        const deletedPaciente = await ModelPaciente.findByIdAndDelete(idPaciente,{
            select: '-__v'
        });  
        return deletedPaciente;
    } catch (error) {
        console.log(error);
    };
};
 
module.exports = deletePacienteById;