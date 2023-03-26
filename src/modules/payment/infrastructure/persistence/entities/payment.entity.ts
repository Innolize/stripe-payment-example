import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column()
  lastPayment: Date;

  @Column()
  status: boolean;

  // billing service id
  @Column()
  externalId: string;
}
