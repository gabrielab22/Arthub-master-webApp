// payment.controller.ts

import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  async createPayment(@Body() body: { amount: number }) {
    const { amount } = body;
    const paymentIntent = await this.paymentService.createPaymentIntent(
      amount,
      'usd',
    );
    return paymentIntent;
  }
}
