import { OrderDetail, OrderItem, PaymentDetail } from '@prisma/client';

export class OrderResponseDto {
  orderDetail: OrderDetail;
}
