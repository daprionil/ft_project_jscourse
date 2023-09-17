const mongoose = require('mongoose');

const SchemaPaciente = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner:{
        type: String,
        required: true
    },
    dateUp:{
        type: Date,
        required: true,
        default: Date.now() // OR this format for date 2003-09-23
    },
    email:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        default: null
    },
    idVeterinario:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "veterinarios",
        required: true,
    }
},{
    timestamps: true
});

//! Define model
const ModelPaciente = mongoose.model('pacientes', SchemaPaciente);

module.exports = ModelPaciente;