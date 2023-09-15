const VeterinarioModel = require("../models/Veterinario");

const editVeterinario = async (idVeterinario, {email, name, password, phoneNumber, website}) => {
    //! Clear empty values
    const dataValidate = Object.entries({
        email,
        name,
        password,
        phoneNumber,
        website
    }).reduce((init, [k,v]) => {
        if(!!v) return ({...init, [k]:v})
        return init;
    },{});

    const veterinario = await VeterinarioModel.findOne({_id:idVeterinario});
    
    //! Edit values with each field
    for(let [k,v] of Object.entries(dataValidate)){
        veterinario[k] = v;
    };

    //!Save changes
    veterinario.save();
    
    return veterinario;
};

module.exports = editVeterinario;