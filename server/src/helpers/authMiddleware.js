const AuthorizationError = require("../TypeErrors/AuthorizationError.js");
const findVeterinarioById = require("../controllers/findVeterinarioById.js");
const verifyTokenJWT = require("./verifyTokenJWT.js");

const authMiddleware = async (req,res, next) => {
    try {
        //! Get value authorization from token send
        const { authorization } = req.headers;
        const rgxAuthorizationValidation = /bearer/i.test(authorization);
    
        //! If exist a token and valid token
        if(!!authorization && rgxAuthorizationValidation){
            const authToken = authorization.replace(/bearer/i, '').trim();
            
            //! Token is signatured by this server -> pass validation
            const {id} = verifyTokenJWT(authToken);
            const veterinario = await findVeterinarioById(id);
            
            //! If doesn't exist a veterinario with that Token valid
            if(!veterinario) throw new AuthorizationError('No existe un usuario perteneciente a dicho token');

            //!If all process is success
            res.locals.veterinario = veterinario;
            next();
            return;
        };
    
        //! If not exist a valid Token
        throw new AuthorizationError('La petición no cuenta con un tóken de Login Válido');
    } catch ({status, message}) {
        res.status(403).json({error: message});
    }
};

module.exports = authMiddleware;
