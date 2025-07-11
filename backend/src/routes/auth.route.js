import express from 'express';
import { loginUser, signupUser, verifyToken } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/verify-token', authMiddleware, verifyToken);

export default router;