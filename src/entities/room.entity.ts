import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Bed from './bed.entity';
import ServiceCategory from './service-category.entity';

@Entity()
export default class Room {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToOne(() => ServiceCategory, (sc) => sc.room)
  serviceCategory: ServiceCategory;
  @OneToMany(() => Bed, (b) => b.room)
  beds: Bed[];
}
