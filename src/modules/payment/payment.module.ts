import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BILLING_SERVICE } from './application/entity/billing-service.interface';
import { PAYMENT_REPOSITORY } from './application/entity/payment.repository.interface';
import { PaymentService } from './application/service/payment.service';
import { PaymentController } from './controller/payment.controller';
import { Payment } from './infrastructure/persistence/entities/payment.entity';
import { PaymentRepository } from './infrastructure/persistence/payment.mysql.repository';
import { StripeService } from './infrastructure/stripe/stripe.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forFeature([Payment]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    { provide: BILLING_SERVICE, useClass: StripeService },
    { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
  ],
})
export class PaymentModule {}
