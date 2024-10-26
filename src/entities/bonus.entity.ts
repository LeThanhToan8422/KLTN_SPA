import { Status } from 'src/enums/status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BonusPointHistory from './bonus-point-history.entity';

@Entity()
export default class Bonus {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  price: number;
  @Column()
  point: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  @OneToMany(() => BonusPointHistory, (bph) => bph.appointment)
  bonusPointHistory: BonusPointHistory[];
}
