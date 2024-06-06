import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe;

  constructor(
    private readonly configService: ConfigService,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.configService.get('STRIPE_API_KEY'), {
      apiVersion: '2024-04-10',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    return this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
    });
  }

  async updatePaymentStatus(paymentId: number) {
    await this.prisma.paymentDetail.update({
      where: { id: paymentId },
      data: { status: PaymentStatus.PAID },
    });
  }
}
