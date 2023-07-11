import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';

@Controller('/produtos')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async postProduct(@Body() productInfo) {
    this.productRepository.saveProducts(productInfo);
    return productInfo;
  }

  @Get()
  async listProducts() {
    return this.productRepository.getProduct();
  }
}
