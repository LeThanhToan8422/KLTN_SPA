import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import TreatmentPackage from './treatment-package.entity';
import Service from './service.entity';

@Entity()
export default class TreatmentService {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  serviceOrder: number;
  @Column()
  numberOfTimes: number;
  @Column()
  treatmentId: number;
  @Column()
  serviceId: number;
  @ManyToOne(() => TreatmentPackage, (tp) => tp.treatmentServices)
  @JoinColumn({
    name: 'treatmentId',
  })
  treatment: TreatmentPackage;
  @ManyToOne(() => Service, (s) => s.treatmentServices)
  @JoinColumn({
    name: 'serviceId',
  })
  service: Service;
}
