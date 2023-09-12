const addVeterinario = require("../controllers/addVeterinario.js");
const confimVeterinarioByToken = require("../controllers/confirmVeterinario.js");
const validateExistVeterinario = require("../controllers/validateExistVeterinario.js");
const generateJWT = require("../helpers/generateJWT.js");

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
            res.status(404).json({error: (new Error('Token no válido')).message});
            return;
        }

        //! Send success json response
        res.json({message: 'Cuenta confirmada...'});
    } catch ({message}) {
        res.json({message})
    };
};

const authVeterinario = async (req,res) => {
    try {
        const { email, password } = req.body;
        
        //! Validate if exist veterinario
        const existsVeterinario = await validateExistVeterinario({email});
        if(!existsVeterinario){
            const {message} = new Error('El usuario no existe');
            return res.status(404).json({error:message});
        };

        //! Validate if the veterinario is confirmed
        if(!existsVeterinario.confirm){
            const {message} = new Error("Tu cuenta no está confirmada");
            return res.status(401).json({error:message});
        };

        //! Validate credentials of veterinario
        const passwordValidation = await existsVeterinario.comparePassword(password);
        if(!passwordValidation){
            const {message} = new Error("La contraseña no es correcta");
            return res.status(403).json({error:message});
        };

        //! Generate JWT and response
        const jwtSesion = generateJWT({id:existsVeterinario.id});

        res.json(jwtSesion);
    } catch ({message}) {
        res.json({error:message});
    };
};


const profile = (req,res) => {
    res.send('Eso');
};

module.exports = {
    register,
    profile,
    confirmAccount,
    authVeterinario
}