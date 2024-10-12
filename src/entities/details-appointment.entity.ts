import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Appointment from './appointment.entity';
import Bed from './bed.entity';

@Entity()
export default class DetailsAppointment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'time',
  })
  timeIn: Date;
  @Column({
    type: 'time',
  })
  timeOut: Date;
  @Column()
  appointmentId: number;
  @Column()
  bedId: number;
  @ManyToOne(() => Appointment, (a) => a.appointmentServices)
  @JoinColumn({
    name: 'appointmentId',
  })
  appointment: Appointment;
  @ManyToOne(() => Bed, (b) => b.appointmentServices)
  @JoinColumn({
    name: 'bedId',
  })
  bed: Bed;
}
