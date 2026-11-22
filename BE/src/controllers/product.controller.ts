import { Request, Response, NextFunction } from 'express';
import { productService } from '../services/product.service';
import { ApiResponse } from '../utils/apiResponse';

export class ProductController {
  public getAllProducts(_req: Request, res: Response, next: NextFunction): void {
    try {
      const products = productService.getAllProducts();
      ApiResponse.success(res, products);
    } catch (err) {
      next(err);
    }
  }

  public getProductById(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const product = productService.getProductById(id);
      ApiResponse.success(res, product);
    } catch (err) {
      next(err);
    }
  }

  public createProduct(req: Request, res: Response, next: NextFunction): void {
    try {
      const created = productService.createProduct(req.body);
      ApiResponse.created(res, created, 'Thêm sản phẩm mới thành công');
    } catch (err) {
      next(err);
    }
  }

  public updateProduct(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      const updated = productService.updateProduct(id, req.body);
      ApiResponse.success(res, updated, 'Cập nhật sản phẩm thành công');
    } catch (err) {
      next(err);
    }
  }

  public deleteProduct(req: Request, res: Response, next: NextFunction): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
      productService.deleteProduct(id);
      ApiResponse.success(res, null, 'Đã xóa sản phẩm thành công');
    } catch (err) {
      next(err);
    }
  }
}

export const productController = new ProductController();
