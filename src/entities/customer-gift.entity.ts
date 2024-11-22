import { StatusCustomerGift } from 'src/enums/status-customer-gift.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Customer from './customer.entity';
import { CategoryGift } from 'src/enums/category-gift.enum';
import Appointment from './appointment.entity';

@Entity()
export default class CustomerGift {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: CategoryGift,
    default: CategoryGift.GIFT,
  })
  category: CategoryGift;
  @Column()
  status: StatusCustomerGift;
  @Column()
  customerId: number;
  @Column()
  giftId: number;
  @ManyToOne(() => Customer, (c) => c.customerGifts)
  @JoinColumn({
    name: 'customerId',
  })
  customer: Customer;
  @OneToOne(() => Appointment, (a) => a.voucher)
  appointment: Appointment;
}
