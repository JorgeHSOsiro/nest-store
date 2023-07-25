import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDTO } from './dto/ProductDTO.dto';
import { UpdatedProductDTO } from './dto/UpdatedProductDTO.dto';
import { ProductService } from './product.service';

@Controller('/produtos')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async postProduct(@Body() productInfo: ProductDTO) {
    const newProduct = await this.productService.createProduct(productInfo);
    return {
      product: newProduct,
      message: 'Produto cadastrado com sucesso!',
    };
  }

  @Get()
  async listProducts() {
    return this.productService.listProducts();
  }

  @Put('/:id')
  async updateProduct(
    @Param('id') id: string,
    @Body() newData: UpdatedProductDTO,
  ) {
    const updatedProduct = await this.productService.updateProduct(id, newData);

    return {
      product: updatedProduct,
      message: 'Produto ataulizado com sucesso!',
    };
  }

  @Delete('/:id')
  async removeProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    return {
      product: product,
      message: 'Produto removido com sucesso!',
    };
  }
}
