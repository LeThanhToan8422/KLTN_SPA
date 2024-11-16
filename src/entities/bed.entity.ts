import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Room from './room.entity';
import AppointmentService from './details-appointment.entity';
import { StatusBed } from 'src/enums/status-bed.enum';
import Appointment from './appointment.entity';
import AppointmentDetail from './appointment-detail.entity';

@Entity()
export default class Bed {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  status: StatusBed;
  @Column()
  roomId: number;
  @ManyToOne(() => Room, (r) => r.beds)
  @JoinColumn({
    name: 'roomId',
  })
  room: Room;
  @OneToMany(() => AppointmentService, (as) => as.bed)
  appointmentServices: AppointmentService[];
  @OneToMany(() => Appointment, (a) => a.bed)
  appointments: Appointment[];
  @OneToMany(() => AppointmentDetail, (a) => a.bed)
  appointmentDetails: AppointmentDetail[];
}
