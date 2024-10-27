import { Status } from 'src/enums/status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Appointment from './appointment.entity';

@Entity()
export default class Bonus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  point: number;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  @OneToMany(() => Appointment, (a) => a.bonus)
  appointments: Appointment[];
}
