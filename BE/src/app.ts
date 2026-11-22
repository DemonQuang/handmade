import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import apiRouter from './routes';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import { ApiResponse } from './utils/apiResponse';
import { HTTP_STATUS } from './constants/httpStatus';

export const createApp = (): Application => {
  const app: Application = express();

  // Global Middlewares
  app.use(cors({ origin: ENV.CORS_ORIGIN, credentials: true }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(requestLogger);

  // Serve static files from uploads folder with browser caching
  app.use(
    '/uploads',
    express.static(ENV.UPLOAD_DIR, {
      maxAge: '1d',
      etag: true,
    })
  );

  // Root welcome route
  app.get('/', (_req: Request, res: Response) => {
    res.json({
      message: '🌟 Welcome to Luna Handmade - Galaxy Nebula Backend API',
      documentation: '/api/health',
      apiVersion: '1.0.0',
    });
  });

  // Mount API endpoints
  app.use('/api', apiRouter);

  // 404 handler for unknown routes
  app.use((req: Request, res: Response) => {
    ApiResponse.error(
      res,
      `Không tìm thấy tài nguyên: ${req.method} ${req.originalUrl}`,
      HTTP_STATUS.NOT_FOUND
    );
  });

  // Global Error Handler
  app.use(errorHandler);

  return app;
};
