import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Voucher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  discount: number;
  @Column()
  minimumOrder: number;
  @Column()
  maximumDiscount: number;
  @Column()
  expiryDate: Date;
  @Column()
  point: number;
  @Column()
  image: string;
}
