import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import ServiceCategory from './service-category.entity';
import { Status } from 'src/enums/status.enum';
import ConsumedProduct from './consumed-product.entity';

@Entity()
export default class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  status: Status;
  @Column()
  image: string;
  @Column()
  serviceCategoryId: number;
  @ManyToOne(() => ServiceCategory, (sc) => sc.products)
  @JoinColumn({
    name: 'serviceCategoryId',
  })
  serviceCategories: ServiceCategory[];
  @OneToMany(() => ConsumedProduct, (cp) => cp.products)
  consumedProducts: ConsumedProduct[];
}
