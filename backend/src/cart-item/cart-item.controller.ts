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

  @Post()
  async create(@Body() data: any): Promise<CartItem> {
    return this.cartItemService.createCartItem(data);
  }

  @Get()
  async findAll(): Promise<CartItem[]> {
    return this.cartItemService.getCartItems();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CartItem | null> {
    return this.cartItemService.getCartItemById(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<CartItem> {
    return this.cartItemService.updateCartItem(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<CartItem> {
    return this.cartItemService.deleteCartItem(+id);
  }
}
