import { ProductImageDTO } from './dto/ProductImageDTO.dto';
import { ProductInfoDTO } from './dto/ProductInfoDTO.dto';

export class ProductEntity {
  id: string;

  name: string;

  price: number;

  availableQuantity: number;

  description: string;

  info: ProductInfoDTO[];

  images: ProductImageDTO[];

  category: string;

  createdAt: string;

  updatedAt: string;

  userId: string;
}
