import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Voucher from './voucher.entity';

@Entity()
export default class VoucherCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  image: string;
  @OneToMany(() => Voucher, (v) => v.voucherCategory)
  vouchers: Voucher[];
}
