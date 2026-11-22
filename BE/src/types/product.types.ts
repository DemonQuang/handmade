export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  title: string;
  price?: string;
  priceDisplay: string;
  rawPrice?: number;
  badge?: string;
  badgeGradient?: string;
  image: string;
  alt?: string;
  cardBorder?: string;
  glowShadow?: string;
  priceColor?: string;
  priceGlow?: string;
  category?: string;
  stock?: string;
  description?: string;
  specifications?: ProductSpecification[];
  createdAt?: string;
}

export type CreateProductDto = Omit<Product, 'id'> & { id?: string };
export type UpdateProductDto = Partial<Product>;
