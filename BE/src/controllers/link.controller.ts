import { Request, Response, NextFunction } from 'express';
import { linkService } from '../services/link.service';
import { ApiResponse } from '../utils/apiResponse';

export class LinkController {
  public getAllLinks(req: Request, res: Response, next: NextFunction): void {
    try {
      const activeOnly = req.query.activeOnly === 'true';
      const links = linkService.getAllLinks(activeOnly);
      ApiResponse.success(res, links);
    } catch (err) {
      next(err);
    }
  }

  public getLinkById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const link = linkService.getLinkById(id);
      ApiResponse.success(res, link);
    } catch (err) {
      next(err);
    }
  }

  public createLink(req: Request, res: Response, next: NextFunction): void {
    try {
      const created = linkService.createLink(req.body);
      ApiResponse.created(res, created, 'Thêm liên kết mới thành công');
    } catch (err) {
      next(err);
    }
  }

  public updateLink(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = linkService.updateLink(id, req.body);
      ApiResponse.success(res, updated, 'Cập nhật liên kết thành công');
    } catch (err) {
      next(err);
    }
  }

  public deleteLink(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      linkService.deleteLink(id);
      ApiResponse.success(res, null, 'Đã xóa liên kết thành công');
    } catch (err) {
      next(err);
    }
  }

  public updateSocials(req: Request, res: Response, next: NextFunction): void {
    try {
      const updated = linkService.updateSocials(req.body);
      ApiResponse.success(res, updated, 'Đã lưu toàn bộ liên kết mạng xã hội');
    } catch (err) {
      next(err);
    }
  }
}

export const linkController = new LinkController();
