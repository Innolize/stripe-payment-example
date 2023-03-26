export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';

export interface IPaymentRepository {
  getOne(): void;

  create(): void;

  update(): void;

  delete(): void;
}
