const CustomError = require("../TypeErrors/CustomError.js");
const addVeterinario = require("../controllers/addVeterinario.js");
const confimVeterinarioByToken = require("../controllers/confirmVeterinario.js");
const validateExistVeterinario = require("../controllers/validateExistVeterinario.js");

const setTokenVeterinario = require("../controllers/setTokenVeterinario.js");
const generateJWT = require("../helpers/generateJWT.js");
const findOneVeterinario = require("../controllers/findOneVeterinario.js");
const editVeterinario = require("../controllers/editVeterinario.js");
const clearTokenVeterinario = require("../controllers/clearTokenVeterinario.js");
const sendMail = require('../controllers/sendMail.js');
const formatConfirmVeterinario = require('../helpers/formatConfirmVeterinario.js');
const formatResetPasswordVeterinario = require("../helpers/formatResetPasswordVeterinario.js");


const register = async (req,res) => {
    //Captura los errores de nuestro código
    try {
        const { email, password, name } = req.body;
        
        //? Validation and Create veterinario
        const veterinarioCreated = await addVeterinario({ email, password, name });

        //? Send Email to confirm with veterinario token
        sendMail({
            mailOptions: formatConfirmVeterinario(
                {
                    email,
                    name,
                    tokenConfirmAccount: veterinarioCreated.token,
                }
            )
        });

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
            throw CustomError.AuthorizationError('Token no Valido');
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
            throw CustomError.NotFoundError('El usuario no existe');
        };

        //! Validate if the veterinario is confirmed
        if(!existsVeterinario.confirm){
            throw CustomError.AuthorizationError("Tu cuenta no está confirmada");
        };

        //! Validate credentials of veterinario
        const passwordValidation = await existsVeterinario.comparePassword(password);
        if(!passwordValidation){
            throw CustomError.AuthorizationError("La contraseña no es correcta");
        };

        //! Generate JWT and response
        const jwtSesion = generateJWT({id:existsVeterinario.id});

        res.json({token: jwtSesion});
    } catch ({message, status = 500}) {
        res.status(status).json({error:message});
    };
};

const passwordToReset = async (req,res) => {
    try {
        const { email } = req.body;
        if(!email) throw CustomError.NotFoundError('No existe un email para la validación');

        //! Get a user veterinario by email
        const veterinario = await validateExistVeterinario({email});
        
        //! If doesn't exist a veterinario with that email
        if(!veterinario) throw CustomError.NotFoundError('Email no encontrado');

        //! Set token in user
        const veterinarioWithTokenId = await setTokenVeterinario(veterinario.id);

        //? Send email to reset password with token id
        sendMail({
            mailOptions: formatResetPasswordVeterinario(
                {
                    tokenResetPassword: veterinarioWithTokenId.token,
                    name: veterinario.name,
                    email: email
                }
            )
        });

        //? Send response with json format
        res.json({message: `Revisa tu correo, Hemos enviado las instrucciones`});
    } catch ({message, status = 500}) {
        res.status(status).json({error:message});
    };
};

const validatePassword = async (req,res) => {
    try {
        const { tokenId } = req.params;
        const veterinarioFind = await findOneVeterinario({token: tokenId});
        
        if(!veterinarioFind) throw CustomError.NotFoundError('El token no es válido');
        
        res.json({
            confirmed: true,
            msg: 'Token válido, puedes continuar'
        });
    } catch ({message, status = 500}) {
        res.status(status).json({error:message});
    };
};

const changePassword = async (req,res) => {
    try {
        const { tokenId } = req.params;
        const { password } = req.body;

        //! If not exist a values
        if(!tokenId || !password) throw CustomError.NotFoundError('No se encuentran los valores requeridos para cambiar contraseña [password, token]');
        
        //! Get a veterinario
        const veterinario = await findOneVeterinario({token:tokenId});
        
        //! if doesn't exist a veterinario with that tokenId
        if(!veterinario) throw CustomError.NotFoundError('Token no válido');

        //! If exist veterinario and the client was set a new Password
        await editVeterinario(veterinario.id, {password});
        const clearedTokenVeterinario = await clearTokenVeterinario({token: tokenId});

        //* Send Response with veterinario password changed
        res.json({
            changed: true,
            veterinario: clearedTokenVeterinario
        });
    } catch ({message, status = 500}) {
        res.status(status).json({error:message});
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