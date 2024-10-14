import { Status } from 'src/enums/status.enum';
import { TypeAccount } from 'src/enums/type-account.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Account {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    unique: true,
  })
  phone: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: TypeAccount,
    default: TypeAccount.CUSTOMER,
  })
  type: TypeAccount;
  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;
}
