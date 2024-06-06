import {
  IsNotEmpty,
  IsInt,
  IsArray,
  ValidateNested,
  IsEnum,
  IsDecimal,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, PaymentMethod, PaymentStatus } from '@prisma/client';

class CreateOrderItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  quantity: number;
}

class CreatePaymentDetailDto {
  @IsDecimal()
  amount: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @IsEnum(PaymentStatus)
  status: PaymentStatus;
}

export class CreateOrderDto {
  @IsInt()
  userId: number;

  @IsDecimal()
  total: string;

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsArray()
  orderItems: CreateOrderItemDto[];

  @ValidateNested()
  @Type(() => CreatePaymentDetailDto)
  paymentDetail: CreatePaymentDetailDto;
}
