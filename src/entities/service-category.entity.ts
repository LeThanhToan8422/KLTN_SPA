import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Service from './service.entity';
import Product from './product.entity';
import Room from './room.entity';

@Entity()
export default class ServiceCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  roomId: number;
  @OneToOne(() => Room, (r) => r.serviceCategory)
  @JoinColumn({
    name: 'roomId',
  })
  room: Room;
  @OneToMany(() => Service, (s) => s.serviceCategories)
  services: Service[];
  @OneToMany(() => Product, (p) => p.serviceCategories)
  products: Product[];
}
