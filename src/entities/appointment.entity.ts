import Customer from './customer.entity';
import Branch from './branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Bonus from './bonus.entity';
import AppointmentDetail from './appointment-detail.entity';
import { StatusPayment } from 'src/enums/status-payment.enum';
import CustomerGift from './customer-gift.entity';

@Entity()
export default class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'date',
  })
  dateTime: Date;
  @Column({
    type: 'enum',
    enum: StatusPayment,
    default: StatusPayment.UNPAID,
  })
  status: StatusPayment;
  @Column()
  customerId: number;
  @Column()
  branchId: number;
  @Column()
  bonusId: number;
  @Column({
    default: null,
  })
  voucherId: number;
  @ManyToOne(() => Customer, (c) => c.appointments)
  @JoinColumn({
    name: 'customerId',
  })
  customer: Customer;
  @ManyToOne(() => Branch, (b) => b.appointments)
  @JoinColumn({
    name: 'branchId',
  })
  branch: Branch;
  @ManyToOne(() => Bonus, (b) => b.appointments)
  @JoinColumn({
    name: 'bonusId',
  })
  bonus: Bonus;
  @OneToOne(() => CustomerGift, (c) => c.appointment)
  @JoinColumn({
    name: 'voucherId',
  })
  voucher: CustomerGift;
  @OneToMany(() => AppointmentDetail, (ad) => ad.appointment)
  appointmentDetails: AppointmentDetail[];
}
