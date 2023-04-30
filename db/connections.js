
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/paper_rater" 
).then(() => console.log("Mongo DB Connected")
).catch((err) =>  console.log("Mongo DB Error:", err));