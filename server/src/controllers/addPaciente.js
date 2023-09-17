const PacienteModel = require('../models/Paciente.js');
const CustomError = require('../TypeErrors/CustomError.js');

const addPaciente = async ({email, phone, owner, description, name, dateUp, idVeterinario}) => {
    //! If doesn't exist all values required
    if(!email && !owner && !name && !description){
        throw CustomError.NotFoundError('No están todos los valores requeridos para la creación');
    };

    //! Clear empty values
    const dataValidate = Object.entries({email, phone, owner, description, name, dateUp}).reduce((init, [k,v]) => (
        !!v ? {...init, [k]:v} : init
    ),{});

    //! Generate Instance
    const paciente = await new PacienteModel(dataValidate);
    paciente.idVeterinario = idVeterinario;

    //! Save instance in DB
    const createdPaciente = await paciente.save();

    return createdPaciente;
};

module.exports = addPaciente;