# Full Stack Project Course JS - MERN

Javascript es un lenguaje contiene todas las herramientas para la creación de una aplicación fullstack, ya sea desde la apariencia, servicios web con consultas a bases de datos.

## Frontend
Será el encargado de consumir una API que puede ser desarrollado en cualquier lenguaje de programación. en el caso del frontend se desarrolla con tecnologías como React, VueJS o otras del entorno.

## Backend
El backend es el encargado de crear una API ofrenciendo endpoints específicos dando respuestas en tipo JSON.

También será el encargado de capturar en sus endpoints los métodos de petición como GET, POST, PUT, DELETE y PATCH.

## Herramientas necesarias para la creación del Proyecto.

- MongoDB, Mongoose, MongoDB Atlas, MongoDB Compass.

## mongoose
Mongoose es una herramienta que nos permite realizar una conexión a bases de datos de MongoDB por medio de nodejs.

- instalación: npm i mongoose
- Inicialización de la base de datos:
    Posterior a la creación de la base de datos en *MongoDB Atlas* vamos a realizar la conexión con el _cluster gist_, con mongoose es bien sencillo realizar esta conexión.

    ```js
        const mongoose = require('mongoose');

        function connectDB(){
            // URL by drivers sections in MongoDB Atlas
            const uri = 'mongodb+srv://<username>:<password>@<hostname>:<port>';
            mongoose.connect(uri, optionsConnection)
                .then(() => {
                    console.log('Base de datos conectada correctamente en ' + uri);
                });
        };
    ```
    Recomendable hacer uso de variables de entorno para valores sensibles en la URI.
- Creación de modelos

## Routing ExpressJS
