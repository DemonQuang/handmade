import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env';
import { Profile, UpdateProfileDto } from '../types/profile.types';
import { SEED_PROFILE } from '../utils/seedData';

export class ProfileRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.join(ENV.DATA_DIR, 'profile.json');
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    if (!fs.existsSync(ENV.DATA_DIR)) {
      fs.mkdirSync(ENV.DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(SEED_PROFILE, null, 2), 'utf-8');
    }
  }

  public getProfile(): Profile {
    this.ensureInitialized();
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return SEED_PROFILE;
    }
  }

  public updateProfile(dto: UpdateProfileDto): Profile {
    const current = this.getProfile();
    const updated: Profile = {
      ...current,
      ...dto,
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(this.filePath, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  }
}

export const profileRepository = new ProfileRepository();
