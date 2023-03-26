import { Controller, Post, RawBodyRequest, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import Stripe from 'stripe';
import { PaymentService } from '../application/service/payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  async checkout(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    const prices = await this.paymentService.priceList(req.body.lookup_key);

    const session = await this.paymentService.createCheckout(prices.data[0]);

    res.redirect(303, session.url);
  }

  @Post('webhook')
  async getHello(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    const rawBody = req.rawBody;

    const signature = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = await this.paymentService.validateEvent(rawBody, signature);
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }

    await this.paymentService.handleEvents(event);

    res.status(200);

    res.send('<p>some html</p>');
  }
}
