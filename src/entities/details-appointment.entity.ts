import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Appointment from './appointment.entity';
import Bed from './bed.entity';
import Employee from './employee.entity';
import Service from './service.entity';

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
  serviceId: number;
  @Column()
  bedId: number;
  @Column()
  employeeId: number;
  @ManyToOne(() => Appointment, (a) => a.appointmentServices)
  @JoinColumn({
    name: 'appointmentId',
  })
  appointment: Appointment;
  @ManyToOne(() => Service, (s) => s.appointmentServices)
  @JoinColumn({
    name: 'serviceId',
  })
  service: Service;
  @ManyToOne(() => Bed, (b) => b.appointmentServices)
  @JoinColumn({
    name: 'bedId',
  })
  bed: Bed;
  @ManyToOne(() => Employee, (e) => e.appointmentServices)
  @JoinColumn({
    name: 'employeeId',
  })
  employee: Employee;
}
