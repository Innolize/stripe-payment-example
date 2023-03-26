export class Payment {
  id: number;

  amount: number;

  currency: string;

  lastPayment: Date;

  status: boolean;

  // billing service id
  externalId: number;
}
