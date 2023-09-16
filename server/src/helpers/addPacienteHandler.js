const PacienteModel = require('../models/Paciente.js');

module.exports = async function(req,res){
    try {
        const {} = req.body;
        
        res.send('Paciente chimba de agregado');
    } catch ({status, message}) {
        res.status(status).json({error: message});
    };
};