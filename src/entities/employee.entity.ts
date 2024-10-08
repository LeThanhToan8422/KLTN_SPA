import { RoleEmployee } from 'src/enums/role-employee.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Schedule from './schedule.entity';
import Wage from './Wage.entity';
import { Status } from 'src/enums/status.enum';
import AppointmentService from './details-appointment.entity';
import Account from './account.entity';

@Entity()
export default class Employee {
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
  @Column({
    type: 'enum',
    enum: RoleEmployee,
    default: RoleEmployee.EMPLOYEE,
  })
  role: RoleEmployee;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  @Column()
  image: string;
  @Column()
  accountId: number;
  @Column()
  wageId: number;
  @OneToOne(() => Account)
  @JoinColumn({
    name: 'accountId',
  })
  account: Account;
  @OneToMany(() => Schedule, (s) => s.employee)
  schedules: Schedule[];
  @ManyToOne(() => Wage, (w) => w.employees)
  @JoinColumn({
    name: 'wageId',
  })
  wage: Wage;
  @OneToMany(() => AppointmentService, (as) => as.employee)
  appointmentServices: AppointmentService[];
}
