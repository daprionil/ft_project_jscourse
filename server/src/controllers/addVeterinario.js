const VeterinarioModel = require('../models/Veterinario.js');
const validateExistVeterinario = require("../controllers/validateExistVeterinario.js");

module.exports = async function({email, password, name}){
    const dataVeterinario = {email, password, name};
    //! Validate values before create
    
    //! Validate if exist a veterinario with equal email
    if(await validateExistVeterinario({email})){
        throw new Error('Ya existe un veterinario con este correo');
    };

    const newVeterinario = new VeterinarioModel(dataVeterinario);
    const created = await newVeterinario.save();

    return created;
};