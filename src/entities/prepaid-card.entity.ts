import { StatusPrepaidCard } from 'src/enums/status-prepaid-card.enum';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Customer from './customer.entity';
import CardHistory from './card-history.entity';

@Entity()
export default class PrepaidCard {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cardNumber: string;
  @Column()
  balance: number;
  @Column({
    type: 'date',
  })
  issueDate: Date;
  @Column({
    type: 'date',
    default: null,
  })
  expiryDate: Date;
  @Column({
    type: 'enum',
    enum: StatusPrepaidCard,
    default: StatusPrepaidCard.ACTIVE,
  })
  status: StatusPrepaidCard;
  @Column()
  customerId: number;
  @OneToOne(() => Customer, (c) => c.prepaidCard)
  @JoinColumn({
    name: 'customerId',
  })
  customer: Customer;
  @OneToMany(() => CardHistory, (c) => c.prepaidCard)
  cardHistories: CardHistory[];
}
