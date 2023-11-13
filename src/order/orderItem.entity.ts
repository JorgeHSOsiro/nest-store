import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from '../product/product.entity';

@Entity({ name: 'orders_items' })
export class OrderItemEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: number;

  @Column({ name: 'sale_price', nullable: false })
  salePrice: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderedItem, {
    cascade: ['update'],
  })
  product: ProductEntity;
}
