import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDTO } from './dto/ProductDTO.dto';
import { ProductEntity } from './product.entity';
import { v4 as uuid } from 'uuid';
import { UpdatedProductDTO } from './dto/UpdatedProductDTO.dto';

@Controller('/produtos')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async postProduct(@Body() productInfo: ProductDTO) {
    const productEntity = new ProductEntity();
    productEntity.id = uuid();
    productEntity.name = productInfo.name;
    productEntity.price = productInfo.price;
    productEntity.availableQuantity = productInfo.availableQuantity;
    productEntity.description = productInfo.description;
    // productEntity.info = productInfo.info;
    // productEntity.images = productInfo.images;
    productEntity.category = productInfo.category;
    productEntity.createdAt = productInfo.createdAt;
    productEntity.updatedAt = productInfo.updatedAt;
    productEntity.userId = productInfo.userId;
    this.productRepository.saveProducts(productEntity);
    return {
      product: productEntity,
      message: 'Produto cadastrado com sucesso!',
    };
  }

  @Get()
  async listProducts() {
    return this.productRepository.getProduct();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: UpdatedProductDTO,
  ) {
    const updatedProduct = await this.productRepository.updateProduct(
      id,
      newData,
    );

    return {
      product: updatedProduct,
      message: 'Produto ataulizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    const product = await this.productRepository.deleteProduct(id);
    return {
      product: product.name,
      message: 'Producto removido com sucesso!',
    };
  }
}
