const VeterinarioModel = require('../models/Veterinario.js');

const updateVeterinario = async (idVeterinario, {name, email, phoneNumber,website}) => {
    const emptyFields = Object.fromEntries(
        Object.entries(
            {
                name,
                phoneNumber,
                email,
                website
            }
        ).map(([key, val]) => [key,val])
    );

    //! Find by id and update data to that veterinario
    const response = await VeterinarioModel.findByIdAndUpdate(
        idVeterinario,
        emptyFields,
        {
            returnDocument: "after",
            select: "-__v -confirm -password"
        }
    );
    return response;
};

module.exports = updateVeterinario;