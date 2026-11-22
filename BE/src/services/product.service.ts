import { Product, CreateProductDto, UpdateProductDto } from '../types/product.types';
import { productRepository, ProductRepository } from '../repositories/product.repository';

export class ProductService {
  constructor(private repo: ProductRepository = productRepository) {}

  public getAllProducts(): Product[] {
    return this.repo.getAllProducts();
  }

  public getProductById(id: string): Product {
    const product = this.repo.getProductById(id);
    if (!product) {
      throw new Error(`Không tìm thấy sản phẩm với id: ${id}`);
    }
    return product;
  }

  public createProduct(dto: CreateProductDto): Product {
    if (!dto || !dto.title || typeof dto.title !== 'string' || !dto.title.trim()) {
      throw new Error('Tên sản phẩm không được để trống');
    }
    const priceDisplay = dto.priceDisplay !== undefined && dto.priceDisplay !== null ? String(dto.priceDisplay).trim() : '';
    if (!priceDisplay) {
      throw new Error('Giá sản phẩm không được để trống');
    }

    const payload: CreateProductDto = {
      ...dto,
      title: dto.title.trim(),
      priceDisplay,
      image: dto.image && typeof dto.image === 'string' && dto.image.trim() ? dto.image.trim() : '/assets/images/product-dragon.jpg',
    };

    return this.repo.createProduct(payload);
  }

  public updateProduct(id: string, dto: UpdateProductDto): Product {
    if (!id || typeof id !== 'string') {
      throw new Error('ID sản phẩm không hợp lệ');
    }
    const data = dto || {};
    if (data.title !== undefined && (typeof data.title !== 'string' || !data.title.trim())) {
      throw new Error('Tên sản phẩm không được để trống');
    }
    const updated = this.repo.updateProduct(id, data);
    if (!updated) {
      throw new Error(`Không tìm thấy sản phẩm với id: ${id}`);
    }
    return updated;
  }

  public deleteProduct(id: string): void {
    const success = this.repo.deleteProduct(id);
    if (!success) {
      throw new Error(`Không tìm thấy sản phẩm để xóa: ${id}`);
    }
  }
}

export const productService = new ProductService();
