import { LinkItem, CreateLinkDto, UpdateLinkDto, UpdateSocialsDto } from '../types/link.types';
import { linkRepository, LinkRepository } from '../repositories/link.repository';

export class LinkService {
  constructor(private repo: LinkRepository = linkRepository) {}

  public getAllLinks(activeOnly = false): LinkItem[] {
    const links = this.repo.getAllLinks();
    if (activeOnly) {
      return links.filter((l) => l.enabled !== false);
    }
    return links;
  }

  public getLinkById(id: string): LinkItem {
    const link = this.repo.getLinkById(id);
    if (!link) {
      throw new Error(`Không tìm thấy liên kết với id: ${id}`);
    }
    return link;
  }

  public createLink(dto: CreateLinkDto): LinkItem {
    if (!dto || !dto.title || typeof dto.title !== 'string' || !dto.title.trim()) {
      throw new Error('Tiêu đề liên kết không được để trống');
    }
    if (!dto.url || typeof dto.url !== 'string' || !dto.url.trim()) {
      throw new Error('Đường dẫn URL không được để trống');
    }
    return this.repo.createLink({
      ...dto,
      title: dto.title.trim(),
      url: dto.url.trim(),
    });
  }

  public updateLink(id: string, dto: UpdateLinkDto): LinkItem {
    if (!id || typeof id !== 'string') {
      throw new Error('ID liên kết không hợp lệ');
    }
    const data = dto || {};
    const updated = this.repo.updateLink(id, data);
    if (!updated) {
      throw new Error(`Không tìm thấy liên kết với id: ${id}`);
    }
    return updated;
  }

  public deleteLink(id: string): void {
    if (!id || typeof id !== 'string') {
      throw new Error('ID liên kết không hợp lệ');
    }
    const success = this.repo.deleteLink(id);
    if (!success) {
      throw new Error(`Không tìm thấy liên kết để xóa: ${id}`);
    }
  }

  public updateSocials(dto: UpdateSocialsDto): LinkItem[] {
    const data = dto || {};
    const links = this.repo.getAllLinks();

    const applyOrUpsert = (
      id: string,
      title: string,
      url: string | undefined,
      icon: string,
      iconColor: string,
      iconBorder: string,
      gradientBorder: string,
      shadow: string
    ) => {
      const existing = links.find((l) => l.id === id || l.title.toLowerCase().includes(id));
      if (url !== undefined && typeof url === 'string') {
        const cleanUrl = url.trim();
        if (existing) {
          existing.url = cleanUrl;
          existing.enabled = Boolean(cleanUrl);
        } else if (cleanUrl) {
          links.push({
            id,
            isHero: false,
            title,
            subtitle: `Kênh chính thức ${title}`,
            url: cleanUrl,
            icon,
            iconColor,
            iconBorder,
            gradientBorder,
            shadow,
            enabled: true,
            order: links.length,
          });
        }
      }
    };

    applyOrUpsert(
      'tiktok',
      'TikTok @luna.craft',
      data.tiktok,
      'play_circle',
      'text-[#ff4d6d]',
      'border-[#ff4d6d]/50',
      'from-[#c9184a]/60 via-[#7209b7]/40 to-[#0077b6]/60 hover:from-[#ff4d6d] hover:to-[#00b4d8]',
      'shadow-[0_0_20px_rgba(201,24,74,0.25)]'
    );

    applyOrUpsert(
      'youtube',
      'Kênh YouTube Studio',
      data.youtube,
      'videocam',
      'text-[#ef4444]',
      'border-[#ef4444]/50',
      'from-[#b91c1c]/60 via-[#c9184a]/50 to-[#7209b7]/60 hover:from-[#ef4444] hover:to-[#ff4d6d]',
      'shadow-[0_0_20px_rgba(239,68,68,0.25)]'
    );

    applyOrUpsert(
      'instagram',
      'Instagram @luna_crafts',
      data.instagram,
      'photo_camera',
      'text-[#f472b6]',
      'border-[#b5179e]/50',
      'from-[#7209b7]/60 via-[#b5179e]/40 to-[#c9184a]/60 hover:from-[#b5179e] hover:to-[#ff4d6d]',
      'shadow-[0_0_20px_rgba(114,9,183,0.25)]'
    );

    applyOrUpsert(
      'facebook',
      'Luna Handmade Fanpage',
      data.facebook,
      'thumb_up',
      'text-[#60a5fa]',
      'border-[#0077b6]/50',
      'from-[#1d3557]/60 via-[#0077b6]/50 to-[#7209b7]/60 hover:from-[#0077b6] hover:to-[#560bad]',
      'shadow-[0_0_20px_rgba(0,119,182,0.25)]'
    );

    applyOrUpsert(
      'zalo',
      'Zalo Tư Vấn 1:1',
      data.zalo,
      'chat',
      'text-[#38bdf8]',
      'border-[#00b4d8]/50',
      'from-[#00b4d8]/50 via-[#7209b7]/50 to-[#c9184a]/50 hover:from-[#00b4d8] hover:to-[#ff4d6d]',
      'shadow-[0_0_20px_rgba(0,180,216,0.25)]'
    );

    return this.repo.saveAllLinks(links);
  }
}

export const linkService = new LinkService();
