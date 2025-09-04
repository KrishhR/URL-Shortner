const express = require('express');
const { 
    handleGenerateNewShortUrl,
    // handleRedirectToOriginalUrl,
    handleGetAnalytics,
} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
// Removed redirect route to make it for Public access
// router.get('/:shortId', handleRedirectToOriginalUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;