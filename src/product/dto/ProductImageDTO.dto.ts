import { IsString, IsUrl } from 'class-validator';

export class ProductImageDTO {
  @IsUrl()
  url: string;

  @IsString()
  description: string;
}
