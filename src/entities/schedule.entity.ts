import { ShiftSchedule } from 'src/enums/shiftSchedule.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Employee from './employee.entity';

@Entity()
export default class Schedule {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'date',
    default: null,
  })
  date: Date;
  @Column({
    type: 'enum',
    enum: ShiftSchedule,
    default: ShiftSchedule.MORNING,
  })
  shift: ShiftSchedule;
  @Column({
    type: 'time',
  })
  checkInTime: Date;
  @Column({
    type: 'time',
  })
  checkOutTime: Date;
  @Column()
  employeeId: number;
  @ManyToOne(() => Employee, (e) => e.schedules)
  @JoinColumn({
    name: 'employeeId',
  })
  employee: Employee;
}
