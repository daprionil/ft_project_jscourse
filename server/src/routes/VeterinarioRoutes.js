const { Router } = require('express');
const { register, profile, confirmAccount, authVeterinario } = require('../handlers/handlerVeterinarios.js');

const veterinarioRouter = Router();

veterinarioRouter.post('/', register);
veterinarioRouter.post('/login', authVeterinario);

veterinarioRouter.get('/confirm/:tokenId', confirmAccount);

veterinarioRouter.get('/profile', profile)

module.exports = veterinarioRouter;