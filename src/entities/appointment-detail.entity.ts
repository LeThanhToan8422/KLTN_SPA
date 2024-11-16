import { CategoryAppointment } from 'src/enums/category-appointment.enum';
import { StatusAppoiment } from 'src/enums/status-appointment.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Bed from './bed.entity';
import Appointment from './appointment.entity';

@Entity()
export default class AppointmentDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'enum',
    enum: CategoryAppointment,
    default: CategoryAppointment.SERVICE,
  })
  category: CategoryAppointment;
  @Column()
  expense: number;
  @Column()
  foreignKeyId: number;
  @Column({
    type: 'enum',
    enum: StatusAppoiment,
    default: StatusAppoiment.CONFIRMED,
  })
  status: StatusAppoiment;
  @Column()
  bedId: number;
  @Column()
  appointmentId: number;
  @ManyToOne(() => Bed, (b) => b.appointmentDetails)
  @JoinColumn({
    name: 'bedId',
  })
  bed: Bed;
  @ManyToOne(() => Appointment, (a) => a.appointmentDetails)
  @JoinColumn({
    name: 'appointmentId',
  })
  appointment: Appointment;
}
