const { Router } = require('express');

const veterinarioRouter = require('./VeterinarioRoutes.js');

const rootRouter = Router();

//! Define tree routers
rootRouter.use('/api/veterinarios', veterinarioRouter);

//* ============
module.exports = rootRouter;