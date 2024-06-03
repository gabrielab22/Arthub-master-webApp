import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [ProductModule, UserModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
