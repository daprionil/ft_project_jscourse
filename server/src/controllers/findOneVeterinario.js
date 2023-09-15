const VeterinarioModel = require("../models/Veterinario.js");

const findOneVeterinario = async ({email, name, id:_id, token}) => {
    const dataValidate = Object.entries({email, name, _id, token}).reduce((init, [k,v]) => {
        if(!!v){
            return {...init, [k]:v}
        }
        return init;
    },{});
    
    //! Search one Veterinario
    const veterinario = await VeterinarioModel.findOne(dataValidate).select("-password -token -confirm");

    return veterinario;
};

module.exports = findOneVeterinario;
