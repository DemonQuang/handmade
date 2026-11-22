import fs from 'fs';
import path from 'path';
import { ENV } from '../config/env';
import { Product, CreateProductDto, UpdateProductDto } from '../types/product.types';
import { SEED_PRODUCTS } from '../utils/seedData';

export class ProductRepository {
  private filePath: string;

  constructor() {
    this.filePath = path.join(ENV.DATA_DIR, 'products.json');
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    if (!fs.existsSync(ENV.DATA_DIR)) {
      fs.mkdirSync(ENV.DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(SEED_PRODUCTS, null, 2), 'utf-8');
    }
  }

  public getAllProducts(): Product[] {
    this.ensureInitialized();
    try {
      const content = fs.readFileSync(this.filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return SEED_PRODUCTS;
    }
  }

  public saveAllProducts(products: Product[]): Product[] {
    fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2), 'utf-8');
    return products;
  }

  public getProductById(id: string): Product | undefined {
    return this.getAllProducts().find((p) => p.id === id);
  }

  public createProduct(dto: CreateProductDto): Product {
    const products = this.getAllProducts();
    const newProduct: Product = {
      ...dto,
      id: dto.id || `prod_${Date.now()}`,
      badge: dto.badge || 'New',
      badgeGradient: dto.badgeGradient || 'from-[#0077b6] to-[#00b4d8]',
      priceColor: dto.priceColor || 'text-[#00b4d8]',
      cardBorder: dto.cardBorder || 'border-[#0077b6]/40 hover:border-[#00b4d8]',
      glowShadow: dto.glowShadow || 'hover:shadow-[0_0_22px_rgba(0,180,216,0.45)]',
      createdAt: new Date().toISOString(),
    };
    products.unshift(newProduct);
    this.saveAllProducts(products);
    return newProduct;
  }

  public updateProduct(id: string, dto: UpdateProductDto): Product | null {
    const products = this.getAllProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) return null;

    products[index] = { ...products[index], ...dto };
    this.saveAllProducts(products);
    return products[index];
  }

  public deleteProduct(id: string): boolean {
    const products = this.getAllProducts();
    const filtered = products.filter((p) => p.id !== id);
    if (filtered.length === products.length) return false;

    this.saveAllProducts(filtered);
    return true;
  }
}

export const productRepository = new ProductRepository();
