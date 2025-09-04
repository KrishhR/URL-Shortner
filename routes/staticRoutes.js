const express = require('express');
const URL = require('../models/url');
const { restrictTo } = require('../middlewares/auth');
const User = require('../models/user');
const router = express.Router();

// ADMIN URL
router.get('/admin/urls', restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await URL.find({ });
    const allUsers = await User.find({ });
    return res.render('home', {
        urls: allUrls,
        users: allUsers,
        adminLogin: true
    });
})

router.get('/', restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    const allUrls = await URL.find({ createdBy: req.user._id });
    return res.render('home', {
        urls: allUrls,
    });
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

router.get('/login', (req, res) => {
    res.render('login');
})

module.exports = router;