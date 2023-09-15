const generateId = require("../helpers/generateId");
const VeterinarioModel = require("../models/Veterinario");

const setTokenVeterinario = async (id) => {
    const veterinario = await VeterinarioModel.findById(id);
    
    veterinario.token = generateId();
    await veterinario.save();

    return veterinario
};

module.exports = setTokenVeterinario;