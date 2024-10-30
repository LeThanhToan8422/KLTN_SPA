import Service from 'src/entities/service.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class DetailService {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  image: string;
  @Column()
  serviceId: number;
  @ManyToOne(() => Service, (s) => s.detailServices)
  @JoinColumn({
    name: 'serviceId',
  })
  service: Service;
}
