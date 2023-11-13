import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CreateOrderDto } from './dto/CreateOrderDTO.dto';
import { OrderEntity } from './order.entity';
import { OrderStatus } from './enum/statusPedido.enum';

import { UserEntity } from '../user/user.entity';
import { OrderItemEntity } from './orderItem.entity';
import { ProductEntity } from '../product/product.entity';
import { UpdateOrderDto } from './dto/UpdateOrderDto.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async searchUser(id) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }

  private handleOrderData(
    orderData: CreateOrderDto,
    relatedProducts: ProductEntity[],
  ) {
    orderData.orderItems.forEach((item) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === item.productId,
      );

      if (!relatedProduct) {
        throw new NotFoundException(
          `O produto com id ${item.productId} não foi encontrado`,
        );
      }

      if (item.quantity > relatedProduct.availableQuantity) {
        throw new BadRequestException(
          `A quantidade solicitada (${item.quantity}) é maior que a disponivel (${relatedProduct.availableQuantity}) para o produto (${relatedProduct.name})`,
        );
      }
    });
  }

  async makeOrder(userId: string, orderData: CreateOrderDto) {
    const user = await this.searchUser(userId);
    const productIds = orderData.orderItems.map((item) => item.productId);

    const relatedProducts = await this.productRepository.findBy({
      id: In(productIds),
    });
    const orderEntity = new OrderEntity();

    orderEntity.status = OrderStatus.PROCESSING;
    orderEntity.user = user;
    this.handleOrderData(orderData, relatedProducts);

    const orderItemsEntities = orderData.orderItems.map((orderedItem) => {
      const relatedProduct = relatedProducts.find(
        (product) => product.id === orderedItem.productId,
      );

      const orderItemEntity = new OrderItemEntity();
      orderItemEntity.product = relatedProduct!;
      orderItemEntity.salePrice = relatedProduct!.price;
      orderItemEntity.quantity = orderedItem.quantity;
      orderItemEntity.product.availableQuantity -= orderedItem.quantity;
      return orderItemEntity;
    });

    const totalValue = orderItemsEntities.reduce((total, item) => {
      return total + item.salePrice * item.salePrice;
    }, 0);

    orderEntity.orderItems = orderItemsEntities;

    orderEntity.totalValue = totalValue;

    const createdOrder = await this.orderRepository.save(orderEntity);

    return createdOrder;
  }

  async findOne(userId: string) {
    const user = await this.searchUser(userId);
    const foundOrder = await this.orderRepository.find({
      where: { user: { id: user.id } },
      relations: {
        user: true,
      },
    });

    return foundOrder;
  }

  async updateOrder(id: string, orderData: UpdateOrderDto) {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) {
      throw new NotFoundException('Pedido não encontrado!');
    }
    Object.assign(order, orderData as OrderEntity);
    return this.orderRepository.save(order);
  }
}
