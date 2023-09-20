const CustomError = require('../TypeErrors/CustomError.js');
const addPaciente = require('../controllers/addPaciente.js');
const getAllPacientes = require('../controllers/getAllPacientes.js');
const getPacienteById = require('../controllers/getPacienteById.js');
const updatePaciente = require('../controllers/updatePaciente.js');
const deletePacienteById = require('../controllers/deletePacienteById.js');

//! route POST/api/pacientes Add new Paciente by Veterinario JWT Token
async function addPacienteHandler(req,res){
    try {
        const {email, phone, owner, description, name, dateUp} = req.body;

        //!Get header authorization JWTtoken
        const idVeterinario = res.locals.veterinario._id;
        const pacienteCreated = await addPaciente({email, phone, owner, description, name, dateUp, idVeterinario});
        
        //! Response to Client
        res.json(pacienteCreated);
    } catch ({status = 500, message}) {
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
    } catch ({status = 500, message}) {
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
    } catch ({status = 500, message}) {
        res.status(status).json({error: message})
    };
};

//! route DELETE/api/paciente/:idPaciente
async function deletePacienteHandler(req,res){
    try {
        const { idPaciente } = req.params;
        const { _id:idVeterinario } = res.locals.veterinario;

        //! If the idPaciente is empty
        if(!idPaciente) throw CustomError.NotFoundError('No hay un id de paciente');
    
        //! If the paciente doesn't exist
        const findPaciente = await getPacienteById(idPaciente);
        if(!findPaciente) throw CustomError.NotFoundError('No existe un paciente con ese Id');

        //! If the paciente has the same idVeterinario
        const validateVeterinarioIdCreatorOfPaciente = findPaciente.idVeterinario.toString() === idVeterinario.toString();
        if(!validateVeterinarioIdCreatorOfPaciente) throw CustomError.AuthorizationError('No está autorizado para eliminar este paciente');

        //? Deleting Paciente
        const deletedPaciente = await deletePacienteById(idPaciente);
        
        //! If the paciente was not eliminated
        if(!deletedPaciente){
            throw CustomError.InternalServerError('Ha ocurrido un error al eliminar el paciente, Intentalo de nuevo más tarde')
        };

        res.json({
            removed: true,
            pacienteRemoved: deletedPaciente
        });
    } catch ({status = 500, message}) {
        res.status(status).json({error: message})
    };
};

//! route PUT/api/paciente/:idPaciente
async function editPacienteHandler(req,res){
    try {
        const { idPaciente } = req.params;
        const { _id:idVeterinario } = res.locals.veterinario;
        const {name, owner, email, description, phone} = req.body;

        //! If the idPaciente is empty
        if(!idPaciente) throw CustomError.NotFoundError('No hay un id de paciente');

        //! If doesn't exist paciente
        const findPaciente = await getPacienteById(idPaciente);
        if(!findPaciente) throw CustomError.NotFoundError('No existe un paciente con ese Id');
        
        //! If paciente has the same idVeterinario of the client
        const validateVeterinarioIdCreatorOfPaciente = idVeterinario.toString() === paciente.idVeterinario.toString();
        if(!validateVeterinarioIdCreatorOfPaciente) throw CustomError.AuthorizationError('No está autorizado para editar este paciente');

        //? Edit paciente
        const pacienteUpdated = await updatePaciente(idPaciente, {
            name,
            owner,
            email,
            description,
            phone
        });
        
        //! If the paciente was not updated
        if(!pacienteUpdated){
            throw CustomError.InternalServerError('Ha ocurrido un error en la base de datos al Intentar actualizar el paciente')
        };

        //? Response with success request
        res.json({
            updated: true,
            pacienteUpdated
        });
    } catch ({status = 500, message}) {
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
