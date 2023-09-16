const { Router } = require('express');
const addPacienteHandler = require('../helpers/addPacienteHandler.js');
const getPacienteHandler = require('../helpers/getPacienteHandler.js');

//? Router Creations
const PacienteRouter = new Router();

//! Creation routes
PacienteRouter.route('/')
    .get(getPacienteHandler)
    .post(addPacienteHandler)

module.exports = PacienteRouter;