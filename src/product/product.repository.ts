import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private productList = [];

  async saveProducts(product) {
    this.productList.push(product);
  }

  async getProduct() {
    return this.productList;
  }

  async updateProduct(id: string, newData: Partial<ProductEntity>) {
    const product = this.productList.find((product) => product.id === id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }
      product[key] = value;
    });
  }

  async deleteProduct(id: string) {
    const product = this.searchProductById(id);
    this.productList = this.productList.filter((product) => product.id !== id);
    return product;
  }

  private async searchProductById(id: string) {
    const product = this.productList.find((product) => product.id === id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  }
}
