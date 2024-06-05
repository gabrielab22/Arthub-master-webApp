import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItem } from '@prisma/client';

@Controller('cart-item')
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post('add-or-update')
  async addOrUpdateCartItem(
    @Body('userId') userId: number,
    @Body('productId') productId: number,
    @Body('quantity') quantity: number,
  ): Promise<CartItem> {
    return this.cartItemService.createOrUpdateCartItem(
      userId,
      productId,
      quantity,
    );
  }
  @Get(':userId')
  async getCartItemsByUserId(
    @Param('userId') userId: number,
  ): Promise<CartItem[]> {
    return this.cartItemService.getCartItemsByUserId(userId);
  }
  @Get(':id')
  async getCartItemById(@Param('id') cartItemId: number): Promise<CartItem> {
    return this.cartItemService.getCartItemById(cartItemId);
  }

  @Delete(':id')
  async deleteCartItem(@Param('id') cartItemId: number): Promise<void> {
    return this.cartItemService.deleteCartItem(cartItemId);
  }
}
