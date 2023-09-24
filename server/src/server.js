require('dotenv').config();
const morgan = require('morgan');
const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes');

//Create server
const server = express();

//! Whitelist cors to enabled request
const whiteListCors = [
    'http://localhost:5173'
]
const corsOptions = {
    origin: function(origin, callback){
        if(whiteListCors.includes(origin)){
            callback(null, true);
        }
    }
};
server.use(cors(corsOptions));

//! Register in console the request of server
server.use(morgan('dev'));

//! Define middlewares
server.use(express.json());

//! Define router
server.use('/',rootRouter);

module.exports = server;