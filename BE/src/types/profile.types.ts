export interface Profile {
  id: string;
  name: string;
  handle: string;
  field: string;
  avatar: string;
  verified: boolean;
  bio: string;
  aboutStory: string;
  story?: string;
  contactPhone: string;
  contactZalo: string;
  location?: string;
  platformBadge?: string;
  copyright?: string;
  updatedAt?: string;
}

export type UpdateProfileDto = Partial<Omit<Profile, 'id'>>;
