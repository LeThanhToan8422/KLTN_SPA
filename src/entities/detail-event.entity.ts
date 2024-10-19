import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Events from './event.entity';

@Entity()
export default class DetailEvent {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  image: string;
  @Column()
  eventId: number;
  @ManyToOne(() => Events, (e) => e.detailEvents)
  @JoinColumn({
    name: 'eventId',
  })
  event: Events;
}
