// Public access routes for DISCORD BOT (Only accessible from Discord)
import urlController from '../controllers/url.js';
import { Router } from 'express';

const router = Router();

// Generate new short URL on Discord
router.post('/generate', urlController.handleCreateNewShortUrlOnDiscord);  

// Get analytics for a short URL
router.get('/analytics/:shortId', urlController.handleGetAnalytics);

export default router;