import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private productList = [];

  async saveProducts(product) {
    this.productList.push(product);
  }

  async getProduct() {
    return this.productList;
  }
}
