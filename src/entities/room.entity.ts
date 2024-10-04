import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Bed from './bed.entity';

@Entity()
export default class Room {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => Bed, (b) => b.room)
  beds: Bed[];
}
