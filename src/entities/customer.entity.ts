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
    default:
      'https://kimbeautyspas.s3.ap-southeast-1.amazonaws.com/9b0c8e11-7887-4319-af7b-e2b8112d01e3-quynh-aka-la-ai-99-hinh-anh-ve-quynh-aka-hai-huoc-1535_901.jpg',
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
