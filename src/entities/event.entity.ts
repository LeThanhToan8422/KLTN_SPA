import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import DetailEvent from './detail-event.entity';
import Prices from './prices.entity';

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
  @Column({
    type: 'date',
  })
  expiryDate: Date;
  @Column()
  image: string;
  @Column({
    default: 0,
  })
  discount: number;
  @OneToMany(() => DetailEvent, (de) => de.event)
  detailEvents: DetailEvent[];
  @OneToMany(() => Prices, (p) => p.event)
  prices: Prices[];
}
