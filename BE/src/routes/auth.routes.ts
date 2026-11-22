import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', (req, res, next) => authController.login(req, res, next));
router.post('/login-google', (req, res, next) => {
  req.body = { ...req.body, isGoogleAuth: true };
  authController.login(req, res, next);
});
router.get('/me', requireAuth, (req, res) => authController.me(req, res));

export default router;
