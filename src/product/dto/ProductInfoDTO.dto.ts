import { IsString } from 'class-validator';
import { ProductEntity } from '../product.entity';

export class ProductInfoDTO {
  id: string;
  @IsString()
  name: string;

  @IsString()
  description: string;

  product: ProductEntity;
}
