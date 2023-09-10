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
    Para la creación de modelos debemos de hacer uso de _mongoose_ teniendo en cuenta que al ser ejecutado en nuestro servidor debe de existir una conexión a una base de datos de _MongoDB_.
    
    - Métodos de creación y su estructura: para la creación del modelo vamos a necesitar un squema y un nombre de colección.
        **Creación del Schema:**
        ```js
            const mongoose = require('mongoose');
            
            const userSchema = mongoose.Schema({
                fullname: {
                    type: String,
                    required: true,
                    trim: true
                },
                username:{
                    type: String,
                    required: true,
                    trim: true
                },
                status:{
                    type: Boolean,
                    default: true
                }
            },{
                timestamps: true
            });
        ```
        **Definición del modelo**
        ```js
            const UserModel = mongoose.model('users', userSchema);
        ```
        Así ya tenemos definido el modelo en nuestra base de datos.

## Routing ExpressJS

Las rutas las podemos definir para tener las direcciones a las cuales nuestro servidor va a responder.

- Creación de un router.
    El router recae en la posición de ser un middleware el cual va a capturar las peticiones que se realicen a este por medio de las direcciones definidas.

    ```js
        const server = require('./server.js');
        const { Router } = require('express');

        //Creación del router
        const rootRouter = Router();

        //! Uso de router en app server
        server.use(rootRouter);
    ```
- Definición de Rutas
    Para definir las rutas vamos a hacer uso de métodos sobre los routers que hemos creado. Estos métodos hacen referencias a los mismos métodos HTTP como los son get, post, patch, put y delete.

    ```js
        const rootRouter = Router();
        rootRouter.get('/users', (req,res) => {
            res.send('Usuarios');
        });
    ```
    El segundo argumento es un callback que se va a ejecutar cuando la ruta sea solicitada este va a lograr tomar desde sus parámetros dos objetos, uno con los valores de la _request -> req_ y otro _response -> res_ el cual va a contener métodos de configuración y acción para lograr responder al cliente.

    Tipos de respuesta:
    - res.send(); Este método nos permite responder con información de tipo _text/html_, el cual se trata de texto plano, este método recibe un string.
    - res.json(); Nos permite responder con datos en Formato JSON, este método recibe un objeto.
    - res.render(); Va a permitirnos responder con el rendeizado de una vista HTML pasada como string hacia el template del cliente, Este método recibe un string el cual será el nombre del archivo con el nombre del template definido dentro de una carpeta llamada "_views_".

    Obtención de valores:
    Estos valores se toman desde el objeto _req_ en el callback solicitado en la creación de la ruta relativa.
    Ej de Referencia:

    ```js
        const rootRouter = require('./routers/index.js');

        //Creación del usuario
        rootRouter.post('/users', (req,res) => {
            //                     /\
            //Objeto request recibido como primer parámetro del callback a ejecutar cueando esta ruta sea solicitada.
        });
    ```

    - Parámetros de ruta relativa:
        Estos parámetros podemos definirlos por medio de nuestro routing; es decir, por medio a los endpoints que creamos en un router.

        Ej:
        ```js
            const rootRouter = require('./router/index.js');
            rootRouter.get('/users/:idUser', (req, res) => {
                //Aquí tomamos ese valor de ruta relativa definido
                res.send(req.params.idUser);
            });
        ```
        Los valores se obtienen desde el objeto _req.params_ y accediendo a la propiedad con clave según la hayamos definido en la ruta.

    - Parámetros por query: se obtienen desde el objeto en _req.query_.
    - Parámetros enviados por data: se obtienen desde el objeto en _req.body_

    **Habilitar _req.body_ con Express:**
    Por defecto _Expressjs_ no cuenta con esta funcionalidad activa, sin embargo este mismo cuenta con la configuración necesaria para darle vida a esta forma de recibir datos.

    Se hace agregando como _middleware_ la ejecución de la función `express.json()` en nuestra instancia de servidor.
    
    ```js
        const express = require('express');
        const server = require('./server.js');

        server.use(express.json()); //Permite ahora recibir valores en body por http
    ```
    //! Posibles cambios en Routing AQUI ================================

## MongoDB models

- Crear un nuevo registro desde tu modelo:
    Con _mongoose_ es bastante simple, debes de tener en cuenta los valores de tu _Schema_ que son obligatorios como mínimo y ejecutar las siguientes instrucciones.

    ```js
        const modelUser = require('./models/User.js');
        
        async function addUser(dataUser){
            const user = new modelUser(dataUser);
            const savedUser = await user.save();

        }
    ```
### Métodos de modelos con Mongoose
- **Model.findOne()**: Este método recibe un objeto y valida en cada registro según las claves del modelo buscando un solo documento que contenga la conincidencia.
- **Model.findById()**: Este método recibe el _Id_ de Documento y valida en cada registro para así retornar el documento encontrado, por el contrario retornaría _null_
- **Model.find()**: Este método recibe un objeto y valida en cada registro según las claves del modelo retornando todos los documentos que coincidan con dichos valores.
- **Model.exists()**: Este método recibe un objeto y valida en cada registro según las claves del modelo respondiendo con el _Id_ del documento encontrado, por el contrario retornaría _null_.

Existen más...

### Modificar un Documento

Para modificar un documento con _mongoose_ solo es necesario obtenerlo por medio de su búsqueda con el modelo y posteriormento realizar el proceso como si de un Objeto se tratase.

Código de Ejemplo:

```js
    const UserModel = require('../models/User.js');

    const IdUser = '98IR9RJL-LT01436M-1CDA59RUM-BBOU0FIM';
    
    async function changeNameUser(){
        // Obtenemos un documento por Id de UserModel
        const userFind = await UserModel.findById(IdUser);
        
        //Modificamos el valor
        userFind.name = 'Jhon Doe';
        
        //Guardamos los cambios <Asincrono>
        await userFind.save();

        return userFind;
    };
```