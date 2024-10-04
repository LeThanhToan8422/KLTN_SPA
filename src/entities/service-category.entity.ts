import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Service from './service.entity';
import Product from './product.entity';

@Entity()
export default class ServiceCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Service, (s) => s.serviceCategories)
  services: Service[];
  @OneToMany(() => Product, (p) => p.serviceCategories)
  products: Product[];
}
