const { Router } = require('express');
const { register, profile, confirmAccount } = require('../handlers/handlerVeterinarios.js');

const veterinarioRouter = Router();

veterinarioRouter.post('/', register);
veterinarioRouter.get('/confirm/:tokenId', confirmAccount);

veterinarioRouter.get('/profile', profile)

module.exports = veterinarioRouter;