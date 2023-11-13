import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { ProductImageDTO } from './ProductImageDTO.dto';
import { ProductInfoDTO } from './ProductInfoDTO.dto';
import { Type } from 'class-transformer';

export class ProductDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(1)
  price: number;

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  availableQuantity: number;

  @IsNotEmpty()
  @MaxLength(1000)
  description: string;

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(2)
  @Type(() => ProductInfoDTO)
  info: ProductInfoDTO[];

  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  createdAt: string;

  @IsNotEmpty()
  updatedAt: string;
}
