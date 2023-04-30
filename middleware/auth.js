const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config({ path: require('find-config')('secret.env') })
const auth = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization; //send in header!! 
      if (authHeader) {
        
        const token = authHeader.split(' ')[1];
        const verifiedUser = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: verifiedUser._id});
        req.user = user;
        next();
      } else {
        res.status(401).send({message: "Missing Authorization header"});
      }
    } catch(err) {
      console.error(err);
      res.status(401).send({message: "Invalid Authorization header"});
    }
  };

module.exports = auth;

