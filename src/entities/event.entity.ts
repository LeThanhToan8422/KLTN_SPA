import { Status } from 'src/enums/status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DetailEvent from './detail-event.entity';

@Entity()
export default class Events {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({
    type: 'date',
  })
  startDate: Date;
  @Column()
  expiryDate: Date;
  @Column()
  image: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  @OneToMany(() => DetailEvent, (de) => de.event)
  detailEvents: DetailEvent[];
}
