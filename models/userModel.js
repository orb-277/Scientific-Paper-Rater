require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
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
        required: false
    },
    author_h_index: {
        type: Number,
        required: false
    },
    privilege_level: {
        type : Number,
        required: true
    },
});



userSchema.methods.generateAuthToken = async function() {
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY , {expiresIn: '14h'});
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
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