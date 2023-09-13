const VeterinarioModel = require('../models/Veterinario.js');

const confimVeterinarioByToken = async ({token}) => {
    const veterinario = await VeterinarioModel.findOne({token}).select("-password -confirm -token");
    
    //!If veterinario exists
    if(veterinario){
        //! Change values to veterinario find
        veterinario.token = null;
        veterinario.confirm = true;
        
        //! Save veterinario
        await veterinario.save();
    };

    return veterinario;
}

module.exports = confimVeterinarioByToken;