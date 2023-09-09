const { Router } = require('express');
const { register, profile } = require('../handlers/handlerVeterinarios.js');

const veterinarioRouter = Router();

veterinarioRouter.post('/', register);
veterinarioRouter.get('/profile', profile)

module.exports = veterinarioRouter;