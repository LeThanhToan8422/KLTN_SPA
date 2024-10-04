import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import TreatmentService from './treatment-service.entity';

@Entity()
export default class TreatmentPackage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  numberOfTimes: number;
  @Column()
  intervalBetweenTimes: number;
  @Column()
  numberOfTimesPerformed: number;
  @Column()
  price: number;
  @Column()
  specialPrice: number;
  @Column()
  downPayment: number;
  @Column()
  commission: number;
  @OneToMany(() => TreatmentService, (ts) => ts.treatment)
  treatmentServices: TreatmentService[];
}
