export interface LinkItem {
  id: string;
  isHero?: boolean;
  title: string;
  subtitle?: string;
  url: string;
  icon: string;
  iconColor?: string;
  iconBorder?: string;
  gradientBorder?: string;
  shadow?: string;
  badgePing?: boolean;
  enabled?: boolean;
  order?: number;
}

export type CreateLinkDto = Omit<LinkItem, 'id'> & { id?: string };
export type UpdateLinkDto = Partial<LinkItem>;

export interface UpdateSocialsDto {
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  instagram?: string;
  zalo?: string;
}
