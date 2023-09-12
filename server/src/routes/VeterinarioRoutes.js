const { Router } = require('express');
const { register, profile, confirmAccount, authVeterinario } = require('../handlers/handlerVeterinarios.js');
const authMiddleware = require('../helpers/authMiddleware.js');

const veterinarioRouter = Router();

//? Crea un usuario de veterinario
veterinarioRouter.post('/', register);
//? Valida al usuario con password y email
veterinarioRouter.post('/login', authVeterinario);
//? Confirma la cuenta de un veterinario por medio de su Id
veterinarioRouter.get('/confirm/:tokenId', confirmAccount);
//? 
veterinarioRouter.get('/profile', authMiddleware, profile);

module.exports = veterinarioRouter;