import { Status } from 'src/enums/status.enum';
import ServiceCategory from './service-category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import AppointmentService from './details-appointment.entity';
import TreatmentService from './treatment-service.entity';

@Entity()
export default class Service {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  duration: number;
  @Column()
  status: Status;
  @Column()
  image: string;
  @Column()
  serviceCategoryId: number;
  @ManyToOne(() => ServiceCategory, (sc) => sc.services)
  @JoinColumn({
    name: 'serviceCategoryId',
  })
  serviceCategories: ServiceCategory[];
  @OneToMany(() => AppointmentService, (as) => as.service)
  appointmentServices: AppointmentService[];
  @OneToMany(() => TreatmentService, (ts) => ts.service)
  treatmentServices: TreatmentService[];
}
