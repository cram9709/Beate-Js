const { Schema, model } = require('mongoose');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default:true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

module.exports = model('User', userSchema);