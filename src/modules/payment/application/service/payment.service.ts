import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import {
  BILLING_SERVICE,
  IBillingService,
} from '../entity/billing-service.interface';
import {
  IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../entity/payment.repository.interface';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(BILLING_SERVICE)
    private readonly billingService: IBillingService,

    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  priceList(lookupKey: string) {
    return this.billingService.priceList(lookupKey);
  }

  getCustomer(id: string) {
    return this.billingService.getCustomer(id);
  }

  createCheckout(price: Stripe.Price) {
    return this.billingService.createCheckout(price);
  }

  validateEvent(payload: Buffer, signature: string): Promise<Stripe.Event> {
    return this.billingService.validateEvent(payload, signature);
  }

  async handleEvents(event: Stripe.Event) {
    let subscription;
    // Handle the event

    switch (event.type) {
      case 'checkout.session.completed':
        subscription = event.data.object;

        console.log(`checkout session is completed.`);

        const customerId = subscription.customer as string;

        const customer = await this.billingService.getCustomer(customerId);

        console.log(customer);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
  }
}
