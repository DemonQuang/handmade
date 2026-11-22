import { Router } from 'express';
import { profileController } from '../controllers/profile.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public view
router.get('/', (req, res, next) => profileController.getProfile(req, res, next));

// Admin update
router.put('/', requireAuth, (req, res, next) => profileController.updateProfile(req, res, next));
router.put('/story', requireAuth, (req, res, next) => profileController.updateStory(req, res, next));

export default router;
