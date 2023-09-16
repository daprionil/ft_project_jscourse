const { Router } = require('express');

const VeterinarioRouter = require('./VeterinarioRoutes.js');
const PacienteRouter = require('./PacienteRoutes.js');

const rootRouter = Router();

//! Define tree routers
rootRouter.use('/api/veterinarios', VeterinarioRouter);
rootRouter.use('/api/pacientes', PacienteRouter);

//* ============
module.exports = rootRouter;