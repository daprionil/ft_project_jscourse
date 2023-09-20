const ModelPaciente = require("../models/Paciente");

async function updatePaciente(idPaciente, {name, owner, email, description, phone}){
    //? Clear empty fields
    const dataValidate = Object.entries({
        name,
        owner,
        email,
        description,
        phone
    }).reduce((init, [k,v]) => (
        !!v ? {...init, [k]:v} : init
    ),{});

    try {
        //! update paciente by Id
        const paciente = await ModelPaciente.findByIdAndUpdate(
            idPaciente,
            dataValidate,
            {
                returnDocument: 'after',
                select: '-__v'
            }
        );
        
        return paciente;
    } catch (error) {
        console.log(error);
    }
};

module.exports = updatePaciente;