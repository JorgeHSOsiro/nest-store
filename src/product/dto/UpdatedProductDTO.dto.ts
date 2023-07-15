import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
  IsArray,
  ValidateNested,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
import { ProductImageDTO } from './ProductImageDTO.dto';
import { ProductInfoDTO } from './ProductInfoDTO.dto';

export class UpdatedProductDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  @IsNumber({
    maxDecimalPlaces: 2,
    allowNaN: false,
    allowInfinity: false,
  })
  @Min(1)
  price: number;

  @IsOptional()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @Min(0)
  availableQuantity: number;

  @IsOptional()
  @MaxLength(1000)
  description: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(2)
  @Type(() => ProductInfoDTO)
  info: ProductInfoDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => ProductImageDTO)
  images: ProductImageDTO[];

  @IsOptional()
  category: string;

  @IsOptional()
  createdAt: string;

  @IsOptional()
  updatedAt: string;
}
