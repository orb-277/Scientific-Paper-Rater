const express = require('express');
const User = require('../models/userModel');
const Paper = require('../models/paperModel');
const router = express.Router();
const {authAdmin} = require('../middleware/auth');

router.get('/users', authAdmin,async (req, res) => {
    try {
        const users = await User.find({}).limit(10);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 

router.get('/users/search',authAdmin , async (req, res) => {
    try {
        const username = req.body.username;
        const users = await User.find({ username: { $regex: username, $options: 'i' } });
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/papers', authAdmin, async (req, res) => {
    try {
        const papers = await Paper.find({}).limit(10);
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/papers/search', authAdmin, async (req, res) => {
    try {
        const title = req.body.title;
        const papers = await Paper.find({ title: { $regex: title, $options: 'i' } });
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//api for getting user's papers 
router.get('/user/papers', authAdmin, async (req, res) => {
    try {
        const username = req.body.username;
        const user_id = User.findOne({ username: username }).select('_id');
        const papers = await Paper.find({ author_user_id: user_id });
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router; 