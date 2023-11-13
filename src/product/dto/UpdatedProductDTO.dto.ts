import { PartialType } from '@nestjs/mapped-types';
import { ProductDTO } from './ProductDTO.dto';

export class UpdatedProductDTO extends PartialType(ProductDTO) {}
