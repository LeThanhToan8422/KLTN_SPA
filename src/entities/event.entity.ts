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
  @OneToMany(() => DetailEvent, (de) => de.event)
  detailEvents: DetailEvent[];
}
