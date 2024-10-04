import { StatusAppoiment } from 'src/enums/status-appointment.enum';
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
import AppointmentService from './details-appointment.entity';

@Entity()
export default class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'date',
  })
  dateTime: Date;
  @Column()
  status: StatusAppoiment;
  @Column()
  customerId: number;
  @Column()
  branchId: number;
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
  @OneToMany(() => AppointmentService, (as) => as.appointment)
  appointmentServices: AppointmentService[];
}
