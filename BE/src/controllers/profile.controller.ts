import { Request, Response, NextFunction } from 'express';
import { profileService } from '../services/profile.service';
import { ApiResponse } from '../utils/apiResponse';

export class ProfileController {
  public getProfile(_req: Request, res: Response, next: NextFunction): void {
    try {
      const profile = profileService.getProfile();
      ApiResponse.success(res, profile);
    } catch (err) {
      next(err);
    }
  }

  public updateProfile(req: Request, res: Response, next: NextFunction): void {
    try {
      const updated = profileService.updateProfile(req.body);
      ApiResponse.success(res, updated, 'Cập nhật thông tin cửa hàng thành công');
    } catch (err) {
      next(err);
    }
  }

  public updateStory(req: Request, res: Response, next: NextFunction): void {
    try {
      const story = typeof req.body?.aboutStory === 'string'
        ? req.body.aboutStory
        : typeof req.body?.story === 'string'
          ? req.body.story
          : '';
      const updated = profileService.updateProfile({ aboutStory: story, story });
      ApiResponse.success(res, updated, 'Cập nhật câu chuyện thành công');
    } catch (err) {
      next(err);
    }
  }
}

export const profileController = new ProfileController();
