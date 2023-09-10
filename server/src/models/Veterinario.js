const mongoose = require('mongoose');
const generateId = require('../helpers/generateId.js');

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
        type: String,
        default: generateId
    },
    confirm: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

//! Define model
const VeterinarioModel = mongoose.model('veterinarios', VeterinarioSchema);

module.exports = VeterinarioModel;