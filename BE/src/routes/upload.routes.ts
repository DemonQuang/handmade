import { Router } from 'express';
import { uploadController } from '../controllers/upload.controller';
import { uploadMiddleware } from '../middlewares/upload.middleware';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Admin: upload image
router.post(
  '/',
  requireAuth,
  uploadMiddleware.single('file'),
  (req, res) => uploadController.uploadFile(req, res)
);

export default router;
