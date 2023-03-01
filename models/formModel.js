const mongoose = require('mongoose');
const axios = require('axios');
const formSchema = new mongoose.Schema({
    author_user_id : {
        type: String,
        required: true
    },
    conference : {
        type: String,
        required: true
    },
    paper_title: {
        type: String,
        required: true
    },
    isInternationalConf: {
        type: Boolean,
        required: true
    },
    SJR_INDEX : {
        type: Number,
        required: true
    },
    isIndexed: {
        type: Boolean,
        required: true
    },
    isPeerReviewed: {
        type: Boolean,
        required: true
    },
    Paper_Score : {
        type: Number,
        required: true
    }
});

formSchema.methods.accumulate_score = async function() {
    //use axios here and mine the params from the api
}
formSchema.methods.update_score  = async function() {
    try{
        let score = 0;
        if(this.isInternationalConf){
            score += 5;
        }
        if(this.isIndexed){
            score += 5;
        }
        if(this.isPeerReviewed){
            score += 5;
        }
        if(this.SJR_INDEX > 0.5){
            score += 5;
        }
        this.Paper_Score = score;
        await this.save();
        return score;
    }catch(err){
        console.log(err);
    }
}

const Form  = mongoose.model('FORM', formSchema);
module.exports = Form ;