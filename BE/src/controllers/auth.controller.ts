import { Request, Response, NextFunction } from 'express';
import { authService } from '../services/auth.service';
import { ApiResponse } from '../utils/apiResponse';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export class AuthController {
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authService.login(req.body);
      ApiResponse.success(res, result, 'Đăng nhập thành công');
    } catch (err) {
      next(err);
    }
  }

  public me(req: AuthenticatedRequest, res: Response): void {
    ApiResponse.success(res, req.user, 'Thông tin phiên đăng nhập hợp lệ');
  }
}

export const authController = new AuthController();
