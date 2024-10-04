import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import VoucherCategory from './voucher-category.entity';

@Entity()
export default class Voucher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  code: string;
  @Column()
  discount: number;
  @Column()
  minimumOrder: number;
  @Column()
  maximumDiscount: number;
  @Column()
  voucherCategoryId: number;
  @ManyToOne(() => VoucherCategory, (vc) => vc.vouchers)
  @JoinColumn({
    name: 'voucherCategoryId',
  })
  voucherCategory: VoucherCategory;
}
