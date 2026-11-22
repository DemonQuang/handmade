import { Router } from 'express';
import { linkController } from '../controllers/link.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public: view links
router.get('/', (req, res, next) => linkController.getAllLinks(req, res, next));
router.get('/:id', (req, res, next) => linkController.getLinkById(req, res, next));

// Admin: Quick update social links (TikTok, YouTube, FB, IG, Zalo)
router.put('/socials', requireAuth, (req, res, next) => linkController.updateSocials(req, res, next));

// Admin: CRUD individual link
router.post('/', requireAuth, (req, res, next) => linkController.createLink(req, res, next));
router.put('/:id', requireAuth, (req, res, next) => linkController.updateLink(req, res, next));
router.delete('/:id', requireAuth, (req, res, next) => linkController.deleteLink(req, res, next));

export default router;
