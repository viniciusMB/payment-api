import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payable')
export class PayableEntity {
  @PrimaryGeneratedColumn()
  payableId: number;

  @Column()
  value: number;

  @Column()
  status: string;

  @Column()
  customerId: string;

  @Column()
  paymentDate: Date;
}
