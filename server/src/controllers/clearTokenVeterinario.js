const NotFoundError = require("../TypeErrors/NotFoundError");
const findOneVeterinario = require("./findOneVeterinario");

const clearTokenVeterinario  = async ({token}) => {
    //! If doesn't exist a token
    if(!token) throw new NotFoundError('No hay un token');

    //! Get a veterinario by Token
    const findVeterinario = await findOneVeterinario({token});
    
    //! Clear token
    findVeterinario.token = null;
    
    //! Save changes
    findVeterinario.save();

    return findVeterinario;
};

module.exports = clearTokenVeterinario;
