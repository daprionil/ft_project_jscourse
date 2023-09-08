const mongoose = require('mongoose');

const { MONGO_USERNAME, MONGO_USER_PASSWORD } = process.env;

const conectarDB = async () => {
    const gist = `mongodb+srv://${MONGO_USERNAME}:${MONGO_USER_PASSWORD}@cluster0.4fyrspp.mongodb.net/?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(gist,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const { host, port } = conn.connection;
    const url = `${host}:${port}`;
    console.log('MongoDB conectado en: ' + url);
}


module.exports = conectarDB;