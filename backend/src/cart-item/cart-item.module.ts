import { Module } from '@nestjs/common';
import { CartItemController } from './cart-item.controller';
import { CartItemService } from './cart-item.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CartItemController],
  providers: [CartItemService, PrismaService],
})
export class CartItemModule {}
