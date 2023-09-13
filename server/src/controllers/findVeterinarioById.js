const VeterinarioModel = require("../models/Veterinario");

const findVeterinarioById = async (id) => {
    let veterinario = null;

    if(id){
        const findVeterinario = await VeterinarioModel.findById(id).select("-password -confirm -token");
        veterinario = findVeterinario;
    }
    return veterinario;
};

module.exports = findVeterinarioById;