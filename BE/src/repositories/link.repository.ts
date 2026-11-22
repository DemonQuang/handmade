import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env';
import { LinkItem, CreateLinkDto, UpdateLinkDto } from '../types/link.types';
import { SEED_LINKS } from '../utils/seedData';

export class LinkRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.join(ENV.DATA_DIR, 'links.json');
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    if (!fs.existsSync(ENV.DATA_DIR)) {
      fs.mkdirSync(ENV.DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(SEED_LINKS, null, 2), 'utf-8');
    }
  }

  public getAllLinks(): LinkItem[] {
    this.ensureInitialized();
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return SEED_LINKS;
    }
  }

  public saveAllLinks(links: LinkItem[]): LinkItem[] {
    fs.writeFileSync(this.filePath, JSON.stringify(links, null, 2), 'utf-8');
    return links;
  }

  public getLinkById(id: string): LinkItem | undefined {
    return this.getAllLinks().find((l) => l.id === id);
  }

  public createLink(dto: CreateLinkDto): LinkItem {
    const links = this.getAllLinks();
    const newLink: LinkItem = {
      ...dto,
      id: dto.id || `link_${Date.now()}`,
      enabled: dto.enabled !== false,
      order: dto.order ?? links.length,
    };
    links.push(newLink);
    this.saveAllLinks(links);
    return newLink;
  }

  public updateLink(id: string, dto: UpdateLinkDto): LinkItem | null {
    const links = this.getAllLinks();
    const index = links.findIndex((l) => l.id === id);
    if (index === -1) return null;

    links[index] = { ...links[index], ...dto };
    this.saveAllLinks(links);
    return links[index];
  }

  public deleteLink(id: string): boolean {
    const links = this.getAllLinks();
    const filtered = links.filter((l) => l.id !== id);
    if (filtered.length === links.length) return false;

    this.saveAllLinks(filtered);
    return true;
  }
}

export const linkRepository = new LinkRepository();
