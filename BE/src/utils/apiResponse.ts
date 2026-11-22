import { Response } from 'express';
import { HTTP_STATUS, HttpStatusCode } from '../constants/httpStatus';

export interface ApiResponsePayload<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export class ApiResponse {
  static success<T>(
    res: Response,
    data?: T,
    message = 'Thành công',
    statusCode: HttpStatusCode = HTTP_STATUS.OK
  ): Response {
    const payload: ApiResponsePayload<T> = {
      success: true,
      message,
      data,
    };
    return res.status(statusCode).json(payload);
  }

  static created<T>(
    res: Response,
    data?: T,
    message = 'Tạo mới thành công'
  ): Response {
    return this.success(res, data, message, HTTP_STATUS.CREATED);
  }

  static error(
    res: Response,
    message = 'Đã có lỗi xảy ra',
    statusCode: HttpStatusCode = HTTP_STATUS.BAD_REQUEST,
    error?: string
  ): Response {
    const payload: ApiResponsePayload = {
      success: false,
      message,
      error,
    };
    return res.status(statusCode).json(payload);
  }
}
