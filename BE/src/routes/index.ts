import { Router } from 'express';
import authRoutes from './auth.routes';
import profileRoutes from './profile.routes';
import linkRoutes from './link.routes';
import productRoutes from './product.routes';
import uploadRoutes from './upload.routes';
import { ApiResponse } from '../utils/apiResponse';

const apiRouter = Router();

apiRouter.use('/auth', authRoutes);
apiRouter.use('/profile', profileRoutes);
apiRouter.use('/links', linkRoutes);
apiRouter.use('/products', productRoutes);
apiRouter.use('/upload', uploadRoutes);

// Health check endpoint
apiRouter.get('/health', (_req, res) => {
  ApiResponse.success(
    res,
    {
      status: 'UP',
      timestamp: new Date().toISOString(),
      service: 'Luna Handmade Backend API',
      version: '1.0.0',
    },
    'Hệ thống đang hoạt động ổn định'
  );
});

export default apiRouter;
