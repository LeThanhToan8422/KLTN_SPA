import { StatusAppoiment } from 'src/enums/status-appointment.enum';
import Customer from './customer.entity';
import Branch from './branch.entity';
import {
  AfterInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AppointmentService from './details-appointment.entity';
import { CategoryAppointment } from 'src/enums/category-appointment.enum';
import Employee from './employee.entity';
import Bed from './bed.entity';
import Bonus from './bonus.entity';

@Entity()
export default class Appointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'datetime',
  })
  dateTime: Date;
  @Column({
    type: 'enum',
    enum: StatusAppoiment,
    default: StatusAppoiment.CONFIRMED,
  })
  status: StatusAppoiment;
  @Column({
    type: 'enum',
    enum: CategoryAppointment,
    default: CategoryAppointment.SERVICE,
  })
  category: CategoryAppointment;
  @Column()
  serviceOrTreatmentId: number;
  @Column()
  employeeId: number;
  @Column()
  customerId: number;
  @Column()
  branchId: number;
  @Column()
  bedId: number;
  @Column()
  bonusId: number;
  @ManyToOne(() => Employee, (e) => e.appointments)
  @JoinColumn({
    name: 'employeeId',
  })
  employee: Employee;
  @ManyToOne(() => Bed, (b) => b.appointments)
  @JoinColumn({
    name: 'bedId',
  })
  bed: Bed;
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
  @OneToMany(() => AppointmentService, (as) => as.appointment)
  appointmentServices: AppointmentService[];

  @AfterInsert()
  insertBonusPointHistory() {
    console.log(this.customerId, this.serviceOrTreatmentId);
  }
}
