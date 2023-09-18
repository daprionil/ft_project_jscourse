const CustomError = require('../TypeErrors/CustomError.js');
const addPaciente = require('../controllers/addPaciente.js');
const getAllPacientes = require('../controllers/getAllPacientes.js');
const getPacienteById = require('../controllers/getPacienteById.js');

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
};

//! route GET/api/paciente/:idPaciente
async function getAPacienteHandler(req,res){
    try {
        const { idPaciente } = req.params;
        const idVeterinario = res.locals.veterinario._id;

        //! If the idPaciente is empty
        if(!idPaciente) throw CustomError.NotFoundError('No hay un id para búsqueda de paciente');
    
        //! get a Paciente by Id
        const paciente = await getPacienteById(idPaciente);
        
        //! Validate if the paciente have idVeterinario with same 
        if(paciente.idVeterinario.toString() !== idVeterinario.toString()){
            throw CustomError.AuthorizationError('No tiene acceso a este paciente.');
        };

        //! Send response
        res.json({paciente});
    } catch ({status, message}) {
        res.status(status).json({error: message})
    };
};

//! route DELETE/api/paciente/:idPaciente
async function deletePacienteHandler(req,res){
    try {
        const { idPaciente } = req.params;
        //! If the idPaciente is empty
        if(!idPaciente) throw CustomError.NotFoundError('No hay un id para búsqueda de paciente');
    
    } catch ({status, message}) {
        res.status(status).json({error: message})
    };
};

//! route PUT/api/paciente/:idPaciente
async function editPacienteHandler(req,res){
    try {
        const { idPaciente } = req.params;
        
        //! If the idPaciente is empty
        if(!idPaciente) throw CustomError.NotFoundError('No hay un id para búsqueda de paciente');
    
    } catch ({status, message}) {
        res.status(status).json({error: message})
    };
};

module.exports = {
    addPacienteHandler,
    getPacientesHandler,
    getAPacienteHandler,
    deletePacienteHandler,
    editPacienteHandler
};
