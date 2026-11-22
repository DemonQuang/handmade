import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';
import { HTTP_STATUS } from '../constants/httpStatus';
import { UserPayload } from '../types/auth.types';

export interface AuthenticatedRequest extends Request {
  user?: UserPayload;
}

export const requireAuth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    ApiResponse.error(
      res,
      'Yêu cầu xác thực. Vui lòng cung cấp Bearer token trong Header Authorization',
      HTTP_STATUS.UNAUTHORIZED
    );
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = authService.verifyToken(token);
    req.user = user;
    next();
  } catch {
    ApiResponse.error(
      res,
      'Phiên đăng nhập không hợp lệ hoặc đã hết hạn',
      HTTP_STATUS.UNAUTHORIZED
    );
  }
};
