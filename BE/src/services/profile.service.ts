import { Profile, UpdateProfileDto } from '../types/profile.types';
import { profileRepository, ProfileRepository } from '../repositories/profile.repository';

export class ProfileService {
  constructor(private repo: ProfileRepository = profileRepository) {}

  public getProfile(): Profile {
    return this.repo.getProfile();
  }

  public updateProfile(dto: UpdateProfileDto): Profile {
    const data = dto || {};
    if (data.name !== undefined && (typeof data.name !== 'string' || !data.name.trim())) {
      throw new Error('Tên Shop không được để trống');
    }
    return this.repo.updateProfile(data);
  }
}

export const profileService = new ProfileService();
