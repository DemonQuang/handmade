import { Router } from 'express';
import { productController } from '../controllers/product.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Public: view products
router.get('/', (req, res, next) => productController.getAllProducts(req, res, next));
router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));

// Admin: manage products
router.post('/', requireAuth, (req, res, next) => productController.createProduct(req, res, next));
router.put('/:id', requireAuth, (req, res, next) => productController.updateProduct(req, res, next));
router.delete('/:id', requireAuth, (req, res, next) => productController.deleteProduct(req, res, next));

export default router;
