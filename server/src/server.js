require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rootRouter = require('./routes');

//Create server
const server = express();

const whiteListCors = [
    'http://localhost:5173'
]
const corsOptions = {
    origin: function(origin, callback){
        if(whiteListCors.includes(origin)){
            callback(null, true);
        }
    }
}
server.use(cors(corsOptions));

//! Define middlewares
server.use(express.json());

//! Define router
server.use('/',rootRouter);

module.exports = server;