import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ProductImageEntity } from './productImage.entity';
import { ProductInfoEntity } from './productInfo.entity';

@Entity({
  name: 'products',
})
export class ProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', length: 100, nullable: false })
  userId: string;

  @Column({ name: 'name', length: 100, nullable: false })
  name: string;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'available_quantity', nullable: false })
  availableQuantity: number;

  @Column({ name: 'description', length: 255, nullable: false })
  description: string;

  @Column({ name: 'category', length: 100, nullable: false })
  category: string;

  @OneToMany(
    () => ProductInfoEntity,
    (productInfoEntity) => productInfoEntity.product,
    { cascade: true, eager: true },
  )
  info: ProductInfoEntity[];

  @OneToMany(
    () => ProductImageEntity,
    (productImageEntity) => productImageEntity.product,
    { cascade: true, eager: true },
  )
  images: ProductImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
