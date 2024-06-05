import { Injectable } from '@nestjs/common';
import { CartItem, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CartItemService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdateCartItem(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    try {
      return await this.prisma.cartItem.create({
        data: {
          userId: userId,
          productId: productId,
          quantity: quantity,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        // Unique constraint error code
        return await this.updateCartItem(userId, productId, quantity);
      } else {
        throw error;
      }
    }
  }

  async updateCartItem(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<CartItem> {
    return await this.prisma.cartItem.update({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  }

  async getCartItemsByUserId(userId: number): Promise<CartItem[]> {
    return this.prisma.cartItem.findMany({
      where: { userId: parseInt(userId.toString()) },
      include: {
        product: true,
      },
    });
  }

  async getCartItemById(cartItemId: number): Promise<CartItem> {
    return await this.prisma.cartItem.findUnique({
      where: {
        id: cartItemId,
      },
    });
  }

  async deleteCartItem(cartItemId: number): Promise<void> {
    await this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });
  }
}
