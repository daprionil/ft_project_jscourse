const generateJWT = require("../helpers/generateJWT");
const VeterinarioModel = require("../models/Veterinario");

const setTokenVeterinario = async (id) => {
    const veterinario = await VeterinarioModel.findOne({_id:id});
    
    veterinario.token = generateJWT();
    await veterinario.save();

    return veterinario
}

module.exports = setTokenVeterinario;