import { Injectable } from '@nestjs/common';
import { Stripe } from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private secret = process.env.STRIPE_SECRET;

  constructor() {
    this.stripe = new Stripe(this.secret, { apiVersion: '2022-11-15' });
  }

  priceList(lookupKey: string) {
    return this.stripe.prices.list({
      lookup_keys: [lookupKey],
      expand: ['data.product'],
    });
  }

  getCustomer(id: string) {
    return this.stripe.customers.retrieve(id, {
      expand: ['line_items'],
    });
  }

  createCheckout(price: Stripe.Price) {
    return this.stripe.checkout.sessions.create({
      billing_address_collection: 'auto',
      line_items: [
        {
          price: price.id,
          // For metered billing, do not pass quantity
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `http://localhost:3000/api/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/api?canceled=true`,
    });
  }

  validateEvent(payload: Buffer, signature: string): Promise<Stripe.Event> {
    const CHECKOUT_SECRET = 'whsec_kbFtr2TWUXh91IU2ZcbU9tJGTywQAql4';
    return this.stripe.webhooks.constructEventAsync(
      payload,
      signature,
      CHECKOUT_SECRET,
    );
  }
}
