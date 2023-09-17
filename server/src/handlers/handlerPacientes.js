const addPaciente = require('../controllers/addPaciente.js');
const getAllPacientes = require('../controllers/getAllPacientes.js');

//! route POST/api/pacientes Add new Paciente by Veterinario JWT Token
async function addPacienteHandler(req,res){
    try {
        const {email, phone, owner, description, name, dateUp} = req.body;

        //!Get header authorization JWTtoken
        const idVeterinario = res.locals.veterinario._id;
        const pacienteCreated = await addPaciente({email, phone, owner, description, name, dateUp, idVeterinario});
        
        //! Response to Client
        res.json(pacienteCreated);
    } catch ({status, message}) {
        res.status(status).json({error: message});
    };
};

//! route GET/api/pacientes GET all Pacientes by Veterinario
async function getPacientesHandler(req,res){
    try {
        const idVeterinario = res.locals.veterinario._id;
        //! Search pacientes
        const pacientes = await getAllPacientes(idVeterinario);

        //! Send response with json format
        res.json(pacientes);
    } catch ({status, message}) {
        res.status(status).json({error: message});
    };   
}

module.exports = {
    addPacienteHandler,
    getPacientesHandler
};
