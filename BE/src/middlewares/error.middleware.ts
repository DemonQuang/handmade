import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../utils/apiResponse';
import { HTTP_STATUS } from '../constants/httpStatus';

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('[Error Middleware]:', err?.message || err);

  if (err?.name === 'MulterError') {
    if (err.code === 'LIMIT_FILE_SIZE') {
      ApiResponse.error(res, 'Kích thước tệp vượt quá giới hạn tối đa (10MB)', HTTP_STATUS.BAD_REQUEST);
      return;
    }
    ApiResponse.error(res, `Lỗi tải tệp: ${err.message}`, HTTP_STATUS.BAD_REQUEST);
    return;
  }

  const statusCode = err?.status || HTTP_STATUS.BAD_REQUEST;
  ApiResponse.error(res, err?.message || 'Lỗi xử lý yêu cầu hệ thống', statusCode);
};
