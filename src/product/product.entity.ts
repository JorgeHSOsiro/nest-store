import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductImageDTO } from './dto/ProductImageDTO.dto';
import { ProductInfoDTO } from './dto/ProductInfoDTO.dto';
import { ProductImage } from './productImage.entity';
import { ProductInfo } from './productInfo.entity';

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

  // @Column({ name: 'info', length: 100, nullable: false })
  // info: ProductInfo[];

  // @Column({ name: 'image', length: 100, nullable: false })
  // images: ProductImage[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
