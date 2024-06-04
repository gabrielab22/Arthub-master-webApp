import { Injectable } from '@nestjs/common';
import { CartItem, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async createCartItem(data: Prisma.CartItemCreateInput): Promise<CartItem> {
    return this.prisma.cartItem.create({ data });
  }

  async getCartItems(): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany();
  }

  async getCartItemById(id: number): Promise<CartItem | null> {
    return this.prisma.cartItem.findUnique({ where: { id } });
  }

  async updateCartItem(
    id: number,
    data: Prisma.CartItemUpdateInput,
  ): Promise<CartItem> {
    return this.prisma.cartItem.update({ where: { id }, data });
  }

  async deleteCartItem(id: number): Promise<CartItem> {
    return this.prisma.cartItem.delete({ where: { id } });
  }
}
