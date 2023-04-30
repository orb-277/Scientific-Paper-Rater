const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv').config({ path: require('find-config')('secret.env') })

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    total_submissions: {
        type: Number,
        required: false,
        default : 0
    },
    author_h_index: {
        type: Number,
        required: false,
        default : 0
    },
    privilege_level: {
        type : Number,
        required: false,
        default : 1
    },
});



userSchema.methods.generateAuthToken = async function() {

    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY , {expiresIn: '14h'});
        return token;
    }catch(err){
        console.log(err);
    }
}
userSchema.methods.checkPassword = async function(password){
    try{
        let result = await bcrypt.compare(password, this.password);
        return result;
    }catch(err){
        console.log(err);
    }
}
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('USER', userSchema);

module.exports = User ; 