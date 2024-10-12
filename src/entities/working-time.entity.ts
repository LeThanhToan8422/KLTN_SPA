import { Status } from './../enums/status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class WorkingTime {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  time: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}
