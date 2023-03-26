import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './modules/payment/infrastructure/persistence/entities/payment.entity';
import { PaymentModule } from './modules/payment/payment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: './data/database.db',
      autoLoadEntities: true,
      entities: [Payment],
    }),
    PaymentModule,
  ],
})
export class AppModule {}
