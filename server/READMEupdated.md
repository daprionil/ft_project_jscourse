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