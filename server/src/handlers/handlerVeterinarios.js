const AuthorizationError = require("../TypeErrors/AuthorizationError.js");
const NotFoundError = require("../TypeErrors/NotFoundError.js");
const addVeterinario = require("../controllers/addVeterinario.js");
const confimVeterinarioByToken = require("../controllers/confirmVeterinario.js");
const validateExistVeterinario = require("../controllers/validateExistVeterinario.js");

const generateJWT = require("../helpers/generateJWT.js");
const setTokenVeterinario = require("../controllers/setTokenVeterinario.js");

const register = async (req,res) => {
    //Captura los errores de nuestro código
    try {
        const { email, password, name } = req.body;
        
        //? Validation and Create veterinario
        const veterinarioCreated = await addVeterinario({ email, password, name });

        //! Response with json
        res.json(veterinarioCreated);
    } catch ({message}) {
        res.status(400).json({error:message});
    };
};

const confirmAccount = async (req, res) => {
    try {
        const {tokenId} = req.params;
        
        //!Validate if exist an veterinario with that token
        const existVeterinario = await confimVeterinarioByToken({token:tokenId});

        //! If not exist
        if(!existVeterinario) {
            throw new AuthorizationError('Token no Valido');
        };

        //! Send success json response
        res.json({message: 'Cuenta confirmada...'});
    } catch ({message, status = 404}) {
        res.status(status).json({message})
    };
};

const authVeterinario = async (req,res) => {
    try {
        const { email, password } = req.body;
        
        //! Validate if exist veterinario
        const existsVeterinario = await validateExistVeterinario({email});
        if(!existsVeterinario){
            const {message} = new NotFoundError('El usuario no existe');
            return res.status(404).json({error:message});
        };

        //! Validate if the veterinario is confirmed
        if(!existsVeterinario.confirm){
            const {message} = new AuthorizationError("Tu cuenta no está confirmada");
            return res.status(401).json({error:message});
        };

        //! Validate credentials of veterinario
        const passwordValidation = await existsVeterinario.comparePassword(password);
        if(!passwordValidation){
            const {message} = new AuthorizationError("La contraseña no es correcta");
            return res.status(403).json({error:message});
        };

        //! Generate JWT and response
        const jwtSesion = generateJWT({id:existsVeterinario.id});

        res.json(jwtSesion);
    } catch ({message, status = 404}) {
        res.status(status).json({error:message});
    };
};

const passwordToReset = async (req,res) => {
    try {
        const { email } = req.body;
        if(email) throw new NotFoundError('No existe un email para la validación');

        //! Get a user veterinario by email
        const veterinario = await validateExistVeterinario({email});
        
        //! If doesn't exist a veterinario with that email
        if(!veterinario) throw new NotFoundError('Email no encontrado');

        //! Set token in user
        await setTokenVeterinario(veterinario.id);

        res.json({message: `Hemos enviado los pasos a tu correo ${email}.`});
    } catch ({message, status}) {
        res.status(status || 404).json({error:message});
    };
};

const validatePassword = async (req,res) => {
    try {
        res.send('Melo');
    } catch ({message, status}) {
        res.status(status || 404).json({error:message});
    };
};

const changePassword = async (req,res) => {
    try {
        res.send('Melo');
    } catch ({message, status}) {
        res.status(status || 404).json({error:message});
    };
};

const profile = (req,res) => {
    const { veterinario } = res.locals;
    res.json({profile: veterinario});
};


module.exports = {
    register,
    profile,
    confirmAccount,
    authVeterinario,
    passwordToReset,
    validatePassword,
    changePassword
}