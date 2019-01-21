const Joi = require('Joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({

    name: {
        type : String,
        required: true,
        minlength:5,
        maxlength:50
    },
    email:{
        type : String,
        required: true,
        minlength:5,
        maxlength:255,
        unique: true
    },
    password:{
        type : String,
        required: true,
        minlength:5,
        maxlength:1024
    },
    isAdmin:Boolean

});
userSchema.methods.generateAuthToken = function(){
    //como es un metodo que le estoy poniendo auser
    //hago this.properti y me la trae , una genialidad
    //no puedo usar arrowFunction porque el this referencia a si mismo
    const token = jwt.sign({_id: this._id,isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}
const User = mongoose.model('User',userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required()
    }
    return Joi.validate(user,schema);
}
exports.User = User;
exports.validate = validateUser;