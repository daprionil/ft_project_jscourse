const mongoose = require('mongoose');


const VeterinarioSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    phoneNumber:{
        type: String,
        default: null,
        trim: true
    },
    website:{
        type: String,
        default: null,
    },
    token:{
        type: String
    },
    confirm: {
        type: Boolean,
        default: false
    }
});

//! Define model
const VeterinarioModel = mongoose.model('veterinario', VeterinarioSchema);

module.exports = VeterinarioModel;