import { Router } from 'express';
import urlModel from '../models/url.js';
import authMiddleware from '../middlewares/auth.js';
import userModel from '../models/user.js';
const router = Router();

// ADMIN URL
router.get('/admin/urls', authMiddleware.restrictTo(['ADMIN']), async (req, res) => {
    const allUrls = await urlModel.find({ });
    const allUsers = await userModel.find({ });
    return res.render('home', {
        urls: allUrls,
        users: allUsers,
        adminLogin: true
    });
})

router.get('/', authMiddleware.restrictTo(['NORMAL', 'ADMIN']), async (req, res) => {
    const allUrls = await urlModel.find({ createdBy: req.user._id });
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

export default router;