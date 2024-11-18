import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Appointment from './appointment.entity';
import Account from './account.entity';
import CustomerGift from './customer-gift.entity';

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullName: string;
  @Column({
    default: false,
  })
  gender: boolean;
  @Column({
    type: 'date',
    default: null,
  })
  dob: Date;
  @Column({
    unique: true,
  })
  phone: string;
  @Column({
    // unique: true,
    default: null,
  })
  email: string;
  @Column({
    default: null,
  })
  address: string;
  @Column({
    default: 'avatar.png',
  })
  image: string;
  @Column({
    default: null,
  })
  accountId: number;
  @OneToOne(() => Account)
  @JoinColumn({
    name: 'accountId',
  })
  account: Account;
  @OneToMany(() => Appointment, (a) => a.customer)
  appointments: Appointment[];
  @OneToMany(() => CustomerGift, (c) => c.customer)
  customerGifts: CustomerGift[];
}
