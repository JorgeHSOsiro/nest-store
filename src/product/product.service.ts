import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from './dto/ProductDTO.dto';
import { UpdatedProductDTO } from './dto/UpdatedProductDTO.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productInfo: ProductDTO) {
    const productEntity = new ProductEntity();

    productEntity.name = productInfo.name;
    productEntity.price = productInfo.price;
    productEntity.availableQuantity = productInfo.availableQuantity;
    productEntity.description = productInfo.description;
    productEntity.info = productInfo.info;
    productEntity.images = productInfo.images;
    productEntity.category = productInfo.category;
    productEntity.createdAt = productInfo.createdAt;
    productEntity.updatedAt = productInfo.updatedAt;

    return this.productRepository.save(productEntity);
  }

  async listProducts() {
    return await this.productRepository.find();
  }

  async updateProduct(id: string, productEntity: UpdatedProductDTO) {
    await this.productRepository.update(id, productEntity);
  }

  async deleteProduct(id: string) {
    await this.productRepository.delete(id);
  }
}
