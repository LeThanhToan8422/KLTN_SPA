import { GiftCategory } from 'src/enums/gift-category.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import CustomerGift from './customer-gift.entity';
import { Status } from 'src/enums/status.enum';

@Entity()
export default class Gift {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  content: string;
  @Column()
  point: number;
  @Column({
    type: 'enum',
    enum: GiftCategory,
    default: GiftCategory.PRODUCT,
  })
  category: GiftCategory;
  @Column()
  image: string;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
  @OneToMany(() => CustomerGift, (c) => c.gift)
  customerGifts: CustomerGift[];
}
