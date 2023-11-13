import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/CreateOrderDTO.dto';
import { UpdateOrderDto } from './dto/UpdateOrderDto.dto';

@Controller('/pedidos')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Query('userId') id: string, @Body() orderData: CreateOrderDto) {
    const userOrder = this.orderService.makeOrder(id, orderData);

    return userOrder;
  }

  @Get()
  findOne(@Query('userId') userId: string) {
    return this.orderService.findOne(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatedOrderData: UpdateOrderDto) {
    return this.orderService.updateOrder(id, updatedOrderData);
  }
}
