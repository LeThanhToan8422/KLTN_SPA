import { StatusCustomerGift } from 'src/enums/status-customer-gift.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Customer from './customer.entity';
import Gift from './gift.entity';

@Entity()
export default class CustomerGift {
  @PrimaryGeneratedColumn()
  id: number;
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
  @ManyToOne(() => Gift, (g) => g.customerGifts)
  @JoinColumn({
    name: 'giftId',
  })
  gift: Gift;
}
