import Customer from './customer.entity';
import Branch from './branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Bonus from './bonus.entity';
import AppointmentDetail from './appointment-detail.entity';

@Entity()
export default class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'datetime',
  })
  dateTime: Date;
  @Column()
  customerId: number;
  @Column()
  branchId: number;
  @Column()
  bonusId: number;
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
  @OneToMany(() => AppointmentDetail, (ad) => ad.appointment)
  appointmentDetails: AppointmentDetail[];
}
