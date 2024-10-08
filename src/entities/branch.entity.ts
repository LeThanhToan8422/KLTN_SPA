import { Status } from 'src/enums/status.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import InternalExpense from './internal-expense.entity';
import Appointment from './appointment.entity';
import ConsumedProduct from './consumed-product.entity';

@Entity()
export default class Branch {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  status: Status;
  @Column()
  image: string;
  @OneToMany(() => InternalExpense, (i) => i.branch)
  internalExpenses: InternalExpense[];
  @OneToMany(() => Appointment, (a) => a.branch)
  appointments: Appointment[];
  @OneToMany(() => ConsumedProduct, (cp) => cp.branches)
  consumedProducts: ConsumedProduct[];
}
