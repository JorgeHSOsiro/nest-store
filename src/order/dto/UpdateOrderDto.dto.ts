import { IsEnum, IsOptional } from 'class-validator';

import { OrderStatus } from '../enum/statusPedido.enum';

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
