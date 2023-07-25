import { IsString, IsUrl } from 'class-validator';
import { ProductEntity } from '../product.entity';

export class ProductImageDTO {
  id: string;
  @IsUrl()
  url: string;

  @IsString()
  description: string;

  product: ProductEntity;
}
