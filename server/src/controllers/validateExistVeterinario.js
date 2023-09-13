const VeterinarioModel = require("../models/Veterinario");

async function validateExistVeterinario({email, id:_id}){
    //! Filter data empty
    const dataValidate = Object.entries({email, _id}).reduce((init, [k,v]) => {
        if(!!v){
            return {...init, [k]:v}
        }
        return init;
    },{});
    const findVeterinario = await VeterinarioModel.findOne(dataValidate).select('-password -confirm -token');
    return findVeterinario;
}

module.exports = validateExistVeterinario;