import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const { userId, total, status, orderItems, paymentDetail } = createOrderDto;

    return this.prisma.$transaction(async (prisma) => {
      const payment = await prisma.paymentDetail.create({
        data: {
          amount: paymentDetail.amount,
          method: paymentDetail.method,
          status: 'INPROGRESS',
        },
      });

      const order = await prisma.orderDetail.create({
        data: {
          total: total,
          status: status,
          user: {
            connect: { id: userId },
          },
          paymentDetail: {
            connect: { id: payment.id },
          },
        },
      });

      const orderItemsCreateMany = orderItems.map((item) => ({
        orderDetailId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      }));

      await prisma.orderItem.createMany({
        data: orderItemsCreateMany,
      });

      return order;
    });
  }
  async findAll() {
    return this.prisma.orderDetail.findMany({
      include: {
        orderItems: true,
        paymentDetail: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.orderDetail.findUnique({
      where: { id },
      include: {
        orderItems: true,
        paymentDetail: true,
      },
    });
  }

  async updateOrder(id: number, updateOrderDto: UpdateOrderDto) {
    const { userId, total, status, orderItems, paymentDetail } = updateOrderDto;

    return this.prisma.$transaction(async (prisma) => {
      const updatedPayment =
        paymentDetail &&
        (await prisma.paymentDetail.update({
          where: {
            id: (
              await prisma.orderDetail.findUnique({
                where: { id },
                select: { paymentId: true },
              })
            ).paymentId,
          },
          data: {
            amount: paymentDetail.amount,
            method: paymentDetail.method,
            status: paymentDetail.status,
          },
        }));

      const updatedOrder = await prisma.orderDetail.update({
        where: { id },
        data: {
          total: total,
          status: status,
          user: {
            connect: { id: userId },
          },
        },
      });

      if (orderItems) {
        await prisma.orderItem.deleteMany({ where: { orderDetailId: id } });

        const orderItemsCreateMany = orderItems.map((item) => ({
          orderDetailId: updatedOrder.id,
          productId: item.productId,
          quantity: item.quantity,
        }));

        await prisma.orderItem.createMany({
          data: orderItemsCreateMany,
        });
      }

      return updatedOrder;
    });
  }

  async removeOrder(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      await prisma.orderItem.deleteMany({ where: { orderDetailId: id } });
      await prisma.orderDetail.delete({ where: { id } });
    });
  }
}
