import { IsString } from 'class-validator';

export class ProductInfoDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;
}
