import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Branch from './branch.entity';
import Product from './product.entity';

@Entity()
export default class ConsumedProduct {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'date',
  })
  date: Date;
  @Column()
  content: string;
  @Column()
  branchId: number;
  @Column()
  productId: number;
  @ManyToOne(() => Branch, (b) => b.consumedProducts)
  @JoinColumn({
    name: 'branchId',
  })
  branches: Branch[];
  @ManyToOne(() => Product, (p) => p.consumedProducts)
  @JoinColumn({
    name: 'productId',
  })
  products: Product[];
}
