import { TypePrices } from 'src/enums/type-prices.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Prices {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  originalPrice: number;
  @Column()
  price: number;
  @Column()
  specialPrice: number;
  @Column()
  commission: number;
  @Column()
  vat: number;
  @Column({
    type: 'date',
  })
  applicableDate: Date;
  @Column({
    type: 'enum',
    enum: TypePrices,
    default: TypePrices.SERVICE,
  })
  type: TypePrices;
  @Column()
  foreignKeyId: number;
}
