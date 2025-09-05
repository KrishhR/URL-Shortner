import { Router } from 'express';
import urlController from '../controllers/url.js';

const router = Router();

router.post('/', urlController.handleGenerateNewShortUrl);
// Removed redirect route to make it for Public access
// router.get('/:shortId', handleRedirectToOriginalUrl);
router.get('/analytics/:shortId', urlController.handleGetAnalytics);

export default router;