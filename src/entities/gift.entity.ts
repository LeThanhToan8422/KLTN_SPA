import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Status } from 'src/enums/status.enum';

@Entity()
export default class Gift {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  point: number;
  @Column()
  image: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}
