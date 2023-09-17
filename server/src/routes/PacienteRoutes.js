const { Router } = require('express');
const authMiddleware = require('../helpers/authMiddleware.js');
const {
    addPacienteHandler,
    getPacientesHandler
} = require('../handlers/handlerPacientes.js');

//? Router Creations
const PacienteRouter = Router();

//! Creation routes
PacienteRouter.route('/')
    .get(authMiddleware, getPacientesHandler)
    .post(authMiddleware, addPacienteHandler)

module.exports = PacienteRouter;