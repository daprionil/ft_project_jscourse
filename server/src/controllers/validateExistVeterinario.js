const VeterinarioModel = require("../models/Veterinario");

async function validateExistVeterinario({email, id:_id}){
    //! Filter data empty
    const dataValidate = Object.entries({email, _id}).reduce((init, [k,v]) => (
        !!v ? {...init, [k]:v} : init
    ),{});
    const findVeterinario = await VeterinarioModel.findOne(dataValidate).select('-token');
    return findVeterinario;
}

module.exports = validateExistVeterinario;