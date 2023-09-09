require('dotenv').config();
const express = require('express');
const rootRouter = require('./routes');

//Create server
const server = express();

//! Define middlewares
server.use(express.json());

//! Define router
server.use('/',rootRouter);

module.exports = server;