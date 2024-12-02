import { Status } from 'src/enums/status.enum';
import { TypePrices } from 'src/enums/type-prices.enum';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Events from './event.entity';

@Entity()
export default class Prices {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  originalPrice: number;
  @Column()
  price: number;
  @Column()
  specialPrice: number;
  @Column()
  commission: number;
  @Column({
    type: 'date',
  })
  applicableDate: Date;
  @Column({
    type: 'enum',
    enum: TypePrices,
    default: TypePrices.SERVICE,
  })
  type: TypePrices;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  @Column()
  foreignKeyId: number;
  @Column({
    default: null,
  })
  eventId: number;
  @ManyToOne(() => Events, (e) => e.prices)
  @JoinColumn({
    name: 'eventId',
  })
  event: Events;
}
