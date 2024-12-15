const mongoose = require ("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required : true
    },
    name : {
        type: String,
        required : true
    },
    email : {
        type: String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    emailVerification : {
        type: Boolean,
    },
})

module.exports = mongoose.model('User', userSchema);