const express = require('express');
const User = require('../models/userModel');
const Paper = require('../models/paperModel');
const router = express.Router();
const { auth } = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');


//the user can view his past submissions 
//tested
router.get('/papers', auth, async (req, res) => {
    try {
        var authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user_id = decoded._id;
        const papers = await Paper.find({ author_user_id: user_id }).sort({"Paper_Score": -1});
        console.log(papers);
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//the user can delete his papers
//tested
router.delete('/papers/delete', auth, async (req, res) => {
    try {
        var authHeader = req.headers.authorization;
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user_id = decoded._id;
        const paper_id = req.body.paper_id;
        console.log(paper_id)
        console.log(user_id)
        const paper = await Paper.findOneAndDelete({ 
            _id: new mongoose.Types.ObjectId(paper_id), 
            author_user_id: user_id 
        });
        if(!paper){
            return res.status(404).json({ error: 'Paper not found' });
        }
        res.status(201).json({ message: 'Paper deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router;