const express = require('express');
const User = require('../models/userModel');
const Paper = require('../models/paperModel');
const router = express.Router();
const {authAdmin} = require('../middleware/auth');

//tested
router.get('/users', authAdmin,async (req, res) => {
    try {
        const users = await User.find({}).select('-password -privilege_level -id').limit(10);
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}); 
//tested
router.get('/users/search',authAdmin , async (req, res) => {
    try {
        const username = req.body.username;
        const users = await User.find({ username: { $regex: username, $options: 'i' } }).select('-password -privilege_level -id');
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
//tested
router.get('/papers', authAdmin, async (req, res) => {
    try {
        const papers = await Paper.find({}).limit(10);
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//tested
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
//tested 
router.get('/user/papers', authAdmin, async (req, res) => {
    try {
        const username = req.body.username;
        const user= await User.findOne({ username: username });
        const user_id = user._id;
        const papers = await Paper.find({ author_user_id: user_id });
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
module.exports = router; 