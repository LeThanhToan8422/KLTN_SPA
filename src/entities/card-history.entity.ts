import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import PrepaidCard from './prepaid-card.entity';

@Entity()
export default class CardHistory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  expense: number;
  @Column()
  content: string;
  @Column()
  prepaidCardId: number;
  @ManyToOne(() => PrepaidCard, (p) => p.cardHistories)
  @JoinColumn({
    name: 'prepaidCardId',
  })
  prepaidCard: PrepaidCard;
}
