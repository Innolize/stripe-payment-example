import Stripe from 'stripe';

export const BILLING_SERVICE = 'BILLING_SERVICE';

export interface IBillingService {
  priceList: (lookupKey: string) => Stripe.ApiListPromise<Stripe.Price>;

  getCustomer: (
    id: string,
  ) => Promise<Stripe.Response<Stripe.Customer | Stripe.DeletedCustomer>>;

  createCheckout: (
    price: Stripe.Price,
  ) => Promise<Stripe.Response<Stripe.Checkout.Session>>;

  validateEvent: (payload: Buffer, signature: string) => Promise<Stripe.Event>;
}
