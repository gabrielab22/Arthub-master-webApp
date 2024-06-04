import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [ProductModule, UserModule, ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
