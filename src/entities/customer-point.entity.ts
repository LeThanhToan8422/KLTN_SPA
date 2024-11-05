import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Customer from './customer.entity';

export default class CustomerPoint {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  expenditures: number;
  @Column()
  accumulationPoints: number;
  @Column()
  currentPoints: number;
  @Column()
  customerId: number;
  @OneToOne(() => Customer)
  @JoinColumn({
    name: 'customerId',
  })
  customer: Customer;
}
