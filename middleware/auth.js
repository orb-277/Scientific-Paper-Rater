const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try{
        const token = req.cookies.jwt;
        const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
        console.log(verifiedUser);
        const user = await User.findOne({_id:verifiedUser._id});
        req.user = user ;
        next(); 
    }catch(err){
        console.log( err);
        res.status(401).send({message: "Missing Authorization/ Auth token expired"});
        next(); 
    }
}

