const mongoose = require('mongoose');
const paperSchema = new mongoose.Schema({
    author_user_id : {
        type: String,
        required: true
    },
    type : {
        type: String,
        required: true
    }, // journal or conference
    association : {
        type: String,
        required: false
    }, 
    conference : {
        type: String,
        required: false
    },
    paper_title: {
        type: String,
        required: true
    },
    isInternationalConf: {
        type: Boolean,
        required: false
    },
    H_INDEX :{
        type: Number,
        required: false
    },
    SJR_INDEX : {
        type: Number,
        required: false
    },
    isIndexed: {
        type: Boolean,
        required: false
    },
    Paper_Score : {
        type: Number,
        required: false
    }
});

paperSchema.methods.accumulate_score = async function() {
    //use axios here and mine the params from the api
}
paperSchema.methods.update_score  = async function() {
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

const Paper  = mongoose.model('PAPER', paperSchema);
module.exports = Paper ;