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
        **Métodos própios de un Schema**
        En esta funcionalidad podemos crear nuestros propios métodos manteniendo el acceso único sobre todas los Documentos y/o Instancias creadas por medio del modelo que haga uso de este Schema.

        ```js
            const userSchema = require('./userSchema.js');
            userSchema.methods.myNewMethod = function(){
                //Podemos hacer uso de _"this"_ que en este caso hará referencia a la instancia manejada.
                return this.username + this.fullname;
            };

            //El método solo será accesible desde las instancias generadas desde el modelo que haga uso de este Schema.

            const UserModel = mongoose.model('users', userSchema);
            const userData = {
                fullname:'Jhon Doe',
                username: 'jhonDoe12'
            };

            const userCreated = await UserModel(userData);
            userCreated.myNewMethod(); // -> 'Jhon DoejhonDoe12';
        ```

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

- `.select()`: Permite seleccionar o eleminar las claves de documento que deseamos dejar o eliminar
    ```js
        const ModelUser = require('../models/UserModel.js');

        async function getUser(id){
            const user = await ModelUser.findById(id).select("-fullname");

            // De esto forma quitaremos de la respuesta la clave [fullname] y nos entregará el objeto con las claves restantes.
        }
    ```
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

## Autenticar usuario - Login
* **Encriptación de Password**:
    bcrypt es una buena opción en cuanto a encriptación se trata para proteger valores de texto. Esta librería nos permite _hashear_ valores y comparar valores escriptados con valores no escriptados.

    Con esta filosofía podemos hacer uso de esta librería para proteger en nuestro proyecto las contraseñas.

    - Encriptación:
        ```js
            const bcrypt = require('bcrypt');
            async function encryptedValue(text){
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(text, salt);

                return hash;//Hash encrypted value
            };
        ```
    - Comparar valores
        ```js
            const bcrypt = require('bcrypt');
            async function compareValues(hashText, textToCompare){
                return await bcrypt.compare(textToCompare, hashText);//Boolean
            };
        ```

* **JWT, JSON WEB TOKEN:**
    Es una medida de seguridad que nos va a permitir aparte de encriptar la información hacer que esta contenga una firma digital que permite identificar la procedencia de la información.

    * Creación de _JWT_:
        ```js
        const jwt = require('jsonwebtoken');
        function genJWT(dataObject){
            return jwt.sign(dataObject, signatureToken);
        };
        ```
    * Verificación o Extracción de _JWT_:
        ```js
            const jwt = require('jsonwebtoken');

            jwt.verify(token, token_secret_signature);
            // Retorna el Objeto JWT
        ```
## Creación de middlewares
Los middlewares son bloques de código que serán ejecutados entre la solicitud de algún endpoint o antes de la ejecución de nuestro propio servidor para realizar algún proceso.

Para la creación de middlewares con _Expressjs_ debemos de entender en qué parte de nuestro servidor nos beneficia más según nuestros intereses; sin embargo hay varios espacios.

Ej:

```js
    const handleProfile = require('./handlers/handleProfile.js');
    const server = require('./server.js');
    const myMiddleware = function(req,res,next){
        console.log('Mi bloque de código');
        next();
    };
    
    //1. En todo el servidor
    server.use(myMiddleware);
   
    //2. En una ruta específica antes del handler
    server.get('/profile', myMiddleware, handleProfile);
```
# Frontend React

Para comenzar, debemos de crear el bundler que nos va a permitir trabajar con React, este nos va a permitir transpilar el código para que pueda ser ejecutado en la web de forma automática.

Vamos a ejecutar el bundler con _vite_, esta herramienta nos permite crear los bundler con distintos proyectos.

```bash
---> npm init vite@latest
```
Seleccionamos la opción de **react** con _javascript_.

Esto va a crear el proyecto base con __*React*, *ReactDom*__

## React Router DOM
Esta librería nos permite generar vistas por medio la url según el valor que contengan después de la dirección de dominio. Esta librería escucha cuando por medio de sus elementos de enlace es accionado para así mostrar según las **rutas** configuradas un componente u otro.

### Instalación
```shell
---> npm i --save-dev react-router-dom
```

### Configuración inicial en nuestra aplicación de React

Existe un elemento provider que nos permite crear rutas desde los componentes contenidos en este elemento, el cual es dado por la Librería.

```js
    import React from 'react';
    import { createRoot } from 'react-dom/client';
    import { BrowserRouter } from 'react-router-dom';
    import App from './App.jsx';

    const root = createRoot(document.querySelector('#root'));
    root.render(
        <React.StrictMode>
            {/* Este nos permite en sus rutas internas comenzar a usar la Librería */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
    )
```

### Creación de Rutas

Para comenzar a crear las rutas debemos de hacer uso de un componente y subcomponentes en los cuales definiremos las rutas.

- `Routes` Componente: permite generar grupo de rutas.
- `Route` Componente: Permite configurar una ruta relacionando el renderizado de un componente.
```js
    import { Route, Routes } from "react-router-dom";
    import Login from "./pages/Login";

    function App() {
        return (
            // Permite crear grupos de rutas
            <Routes>
                {/* Crea una ruta y renderiza un componente cuando esta esté en el path */}
                <Route path="/" element={<AuthLayout />}/>
                <Route path="/login" element={<Login />}/>
            </Routes>
        )
    }

    export default App;
```

- Hooks de React Router: Los hooks permiten acceder a funcionalidades ancladas al ciclo de vida o estado de nueva aplicación, siendo estos ejecutados en componentes de función.
    - useParams: nos permite acceder con un objeto, a los parámetros definidos en la ruta dinámica configurada. Hace referencia a la forma de tomar un valor con una ruta dinámica.

## Envío de Emails
Herramientas:
- mailtrap: Es un entorno de recepción, envío y control de peticiones SMTP para correos electrónicos, permite que no se traten como un spam si no que sean tomados de forma válida.

Nos vamos registrar y al iniciar sesión, crearémos un _box de testing_ con la configuración para __nodejs__.

mailtrap nos va a proveer de un código de Javascript para dicho fin.
```js
    var transport = nodemailer.createTransport({
        host: "sandbox.io",
        port: 5050,
        auth: {
            user: "example",
            pass: "example"
        }
    });
```
- nodemailer: Es una librería de _nodejs_ para el envío de mensajes por medio del protocolo _SMTP_.
Para comenzar con esta librería y crear un servicio para el envío de emails vamos tener que seguir las siguientes instrucciones.
    - **Generar un transporte**: Podemos hacerlo por medio de un método que tiene _nodemailer_ el cual nos retorna un objeto configurado para el envío de Emails desde este, este transporte nos permite enviar por medio de un método la solicitud _SMTP_.
    
    ```js
        const nodemailer = require('nodemailer');

        const tranporter = nodemailer.createTransport({// Recibe un objeto de configuración con el siguiente formato
            host: <YOUR HOST SMTP SERVICE>,
            port: <YOUR PORT SMTP SERVICE>,
            auth:{
                user: <YOUR USER SMTP SERVICE>,
                pass: <YOUR HOST SMTP SERVICE>
            }
        });

        module.exports = transporter;
    ```
    - **Envío de email**: Vamos a hacer uso del método que nos entrega __transporter__ para enviar un email. Este método no es asincrono si no que funciona por medio de un callback. En su primer argumento solicita un objeto de configuración con el siguiente formato, y seguido en su segundo argumento solicita un _callback_ para ser ejecutado luego de que finalice el proceso de envío.
    ```js
        const transporter = require('../transporter.js');

        function sendMail(){
            transporter.sendMail({
                from: < Titulo de quien lo envía>,
                to: <Email que recibe el mail>,
                subject: <Asunto del mail>,
                text: < Texto HTML >,
                html: < Template HTML para el mail>,
            })
        }
    ```
## Variables de entorno con Vite
Las variables de entorno en vite tienen su propia configuración y forma de hacer uso de ellas.
Podemos definir diferentes tipos de archivo siempre con la extension _.env_ y __vite__ lo va a tomar de igual forma, esto lo hace un requisito. Además __vite__ requiere que las variables que necesitemos sean declaradas anteponiendo la palabra "VITE_", Ej: 'VITE_HOST_DB' o 'VITE_USER_NAME', De esta forma __vite__ va a permitirnos acceder a ellas desde el código.

Para acceder a las variables de entorno con __vite__ debemos de ir anidando con sintaxis de punto iniciando desde el objeto principal `import.meta.env.[VITE_NAME_VARIABLE]`.