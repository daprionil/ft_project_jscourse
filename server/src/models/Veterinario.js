const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

VeterinarioSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
        return;
    };

    const password = this.password;
    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(password, salt);
});

VeterinarioSchema.methods.comparePassword = async function(passwordToCompare){
    return await bcrypt.compare(passwordToCompare, this.password);
}

//! Define model
const VeterinarioModel = mongoose.model('veterinarios', VeterinarioSchema);

module.exports = VeterinarioModel;