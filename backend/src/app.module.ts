import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';
import { CartItemModule } from './cart-item/cart-item.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [ProductModule, UserModule, ContactModule, CartItemModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
