import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PrepaidCard from './prepaid-card.entity';
import Appointment from './appointment.entity';
import Account from './account.entity';

@Entity()
export default class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullName: string;
  @Column()
  gender: boolean;
  @Column({
    type: 'date',
    default: null,
  })
  dob: Date;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  address: string;
  @Column()
  accountId: number;
  @OneToOne(() => Account)
  @JoinColumn({
    name: 'accountId',
  })
  account: Account;
  @OneToOne(() => PrepaidCard, (p) => p.customer)
  prepaidCard: PrepaidCard;
  @OneToMany(() => Appointment, (a) => a.customer)
  appointments: Appointment[];
}
