const VeterinarioModel = require("../models/Veterinario");

async function validateExistVeterinario({email}){
    const findVeterinario = await VeterinarioModel.exists({email});
    return !!findVeterinario;
}

module.exports = validateExistVeterinario;