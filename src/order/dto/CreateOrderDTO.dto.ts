import { UserEntity } from 'src/user/user.entity';
import { OrderStatus } from '../enum/statusPedido.enum';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItemDTO } from './OrderItemDTO.dto';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested()
  @ArrayMinSize(1)
  @Type(() => OrderItemDTO)
  orderItems: OrderItemDTO[];
}
