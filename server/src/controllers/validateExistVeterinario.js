const VeterinarioModel = require("../models/Veterinario");

async function validateExistVeterinario({email}){
    //! Filter data empty
    const dataValidate = Object.entries({email}).reduce((init, [k,v]) => {
        if(!!v){
            return {...init, [k]:v}
        }
        return init;
    },{});

    const findVeterinario = await VeterinarioModel.findOne(dataValidate);
    return findVeterinario;
}

module.exports = validateExistVeterinario;