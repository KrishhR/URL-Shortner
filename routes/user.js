import { Router } from 'express';
import userController from '../controllers/user.js';

const router = Router();

router.post('/', userController.handleUserSignup);
router.post('/login', userController.handleUserLogin);

export default router;