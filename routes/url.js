const express = require('express');
const { 
    handleGenerateNewShortUrl,
    handleRedirectToOriginalUrl,
    handleGetAnalytics,
} = require('../controllers/url');

const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handleRedirectToOriginalUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;