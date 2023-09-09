const server = require('./src/server.js');
const conectarDB = require('./src/db.js');

const { PORT_SERVER } = process.env;
const port = PORT_SERVER || 4000;

//* =======================================



//* =======================================

//? Promise with initialize app
const promiseInitApp = () => new Promise(async (resolve, reject) => {
    try {
        await conectarDB();
        resolve();
    } catch ({message}) {
        reject(message);
    }
});

//! Initialize App
const appInit = promiseInitApp(); 

appInit
    .then(() => {
        server.listen(port, () => {
            console.log('Servidor corriendo en puerto ' + port);
        });
    }).catch(console.log);
