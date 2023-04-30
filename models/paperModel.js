const mongoose = require('mongoose');
const paperSchema = new mongoose.Schema({
    //known params 
    author_user_id : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    }, // journal or conference
    journal_conf_name : {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    },
    DOI : {
        type: String,
        required: true
    }, 
    //unknown params

    association : {
        type: String,
        default : "Unknown",
        required: false
    }, 
    H_INDEX :{
        type: Number,
        default : 0,
        required: false
    },
    SJR_INDEX : {
        type: Number,
        default : 0,
        required: false
    },
    isIndexed: {
        type: Boolean,
        default : false ,
        required: false
    },
    Paper_Score : {
        type: Number,
        default : 0, 
        required: false
    },
    auth_h_index :
    {
        type: Number,
        //set default value to -1 
        default: -1,
        required: false
    }
});


const Paper  = mongoose.model('PAPER', paperSchema);
module.exports = Paper ;