import { Request, Response } from 'express';
import { ApiResponse } from '../utils/apiResponse';
import { ENV } from '../config/env';
import { HTTP_STATUS } from '../constants/httpStatus';

export class UploadController {
  public uploadFile(req: Request, res: Response): void {
    if (!req.file) {
      ApiResponse.error(res, 'Không tìm thấy tệp tải lên', HTTP_STATUS.BAD_REQUEST);
      return;
    }

    const fileUrl = `${ENV.BASE_URL}/uploads/${req.file.filename}`;

    ApiResponse.success(
      res,
      {
        fileName: req.file.filename,
        originalName: req.file.originalname,
        url: fileUrl,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
      'Tải lên hình ảnh thành công'
    );
  }
}

export const uploadController = new UploadController();
