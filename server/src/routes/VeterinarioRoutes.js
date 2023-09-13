const { Router } = require('express');
const { 
    register,
    profile,
    confirmAccount,
    authVeterinario,
    passwordToReset,
    validatePassword,
    changePassword,

} = require('../handlers/handlerVeterinarios.js');
const authMiddleware = require('../helpers/authMiddleware.js');

const veterinarioRouter = Router();

//!Public Routes
    //? Crea un usuario de veterinario
    veterinarioRouter.post('/', register);

    //? Valida al usuario con password y email
    veterinarioRouter.post('/login', authVeterinario);

    //? Valida el email y crea un token para reestablecer la contraseña
    veterinarioRouter.post('/password', passwordToReset);

    veterinarioRouter.route('/password/:tokenId')
        //? Valida el token
        .get(validatePassword)
        //? Por medio del token cambia la contraseña según formulario
        .post(changePassword);

    //? Confirma la cuenta de un veterinario por medio de su Id
    veterinarioRouter.get('/confirm/:tokenId', confirmAccount);

    //! Private routes
    //? Valida token y retorna profile
    veterinarioRouter.get('/profile', authMiddleware, profile);

module.exports = veterinarioRouter;