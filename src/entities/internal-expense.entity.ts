import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Branch from './branch.entity';

@Entity()
export default class InternalExpense {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  expense: number;
  @Column()
  content: string;
  @Column()
  date: Date;
  @Column()
  branchId: number;
  @ManyToOne(() => Branch, (b) => b.internalExpenses)
  @JoinColumn({
    name: 'branchId',
  })
  branch: Branch;
}
