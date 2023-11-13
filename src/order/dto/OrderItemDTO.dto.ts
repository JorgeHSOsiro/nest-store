import { IsInt, IsUUID } from 'class-validator';

export class OrderItemDTO {
  @IsUUID()
  productId: string;

  @IsInt()
  quantity: number;
}
