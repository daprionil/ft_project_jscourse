module.exports = async function(req,res){
    try {
        res.send('Tome su paciente');
    } catch ({status, message}) {
        res.status(status).json({error: message});
    };   
}