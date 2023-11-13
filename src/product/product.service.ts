import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDTO } from './dto/ProductDTO.dto';
import { UpdatedProductDTO } from './dto/UpdatedProductDTO.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(productData: ProductDTO) {
    const productEntity = new ProductEntity();

    Object.assign(productEntity, productData as ProductEntity);

    return this.productRepository.save(productEntity);
  }

  async listProducts() {
    return await this.productRepository.find();
  }

  async updateProduct(id: string, newData: UpdatedProductDTO) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('O produto não foi encontrado');
    }
    Object.assign(product, newData as ProductEntity);

    await this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    const deletedProduct = await this.productRepository.delete(id);
    if (!deletedProduct.affected) {
      throw new NotFoundException('O produto não foi encontrado');
    }
  }
}
