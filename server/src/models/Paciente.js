const mongoose = require("mongoose");

const SchemaPaciente = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    owner:{
        type: String,
        require: true
    },
    dateUp:{
        type: Date,
        required: true,
        default: Date.now()
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
        ref: "veterinarios"
    }
},{
    timestamps: true
})