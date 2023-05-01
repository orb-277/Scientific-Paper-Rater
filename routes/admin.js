const express = require('express');
const User = require('../models/userModel');
const Paper = require('../models/paperModel');
const router = express.Router();
const {authAdmin} = require('../middleware/auth');

//tested
//id in list for manipulations * 
router.get('/users', authAdmin,async (req, res) => {
    try {
        const users = await User.find({}).select('-password -privilege_level').limit(10);
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
        const users = await User.find({ username: { $regex: username, $options: 'i' } }).select('-password -privilege_level');
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
        const user_id = req.body.user_id;
        const papers = await Paper.find({ author_user_id: user_id });
        res.json(papers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// api for deletin user with user_id 
//tested
router.delete('/user/delete', authAdmin, async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const user = await User.findByIdAndDelete(user_id);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//api for deleting paper with paper_id
//tested
router.delete('/paper/delete', authAdmin, async (req, res) => {
    try {
        const paper_id = req.body.paper_id;
        const paper = await Paper.findByIdAndDelete(paper_id);
        res.status(201).json(paper);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

        



module.exports = router; 