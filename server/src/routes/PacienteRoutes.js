const { Router } = require('express');
const authMiddleware = require('../helpers/authMiddleware.js');
const {
    addPacienteHandler,
    getPacientesHandler,
    getAPacienteHandler,
    deletePacienteHandler,
    editPacienteHandler
} = require('../handlers/handlerPacientes.js');

//? Router Creation
const PacienteRouter = Router();

//! Creation routes
PacienteRouter.route('/')
    .get(authMiddleware, getPacientesHandler)
    .post(authMiddleware, addPacienteHandler)

    PacienteRouter.route('/:idPaciente')
    .get(authMiddleware, getAPacienteHandler)
    .put(authMiddleware, editPacienteHandler)
    .delete(authMiddleware, deletePacienteHandler);


module.exports = PacienteRouter;