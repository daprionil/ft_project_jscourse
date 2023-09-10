const addVeterinario = require("../controllers/addVeterinario.js");
const confimVeterinarioByToken = require("../controllers/confirmVeterinario.js");

const register = async (req,res) => {
    //Captura los errores de nuestro código
    try {
        const { email, password, name } = req.body;
        
        //? Validation and Create veterinario
        const veterinarioCreated = await addVeterinario({ email, password, name });

        //! Response with json
        res.json(veterinarioCreated);
    } catch ({message}) {
        res.status(400).json({error:message})
    }
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


const profile = (req,res) => {
    res.send('Eso');
};

module.exports = {
    register,
    profile,
    confirmAccount
}