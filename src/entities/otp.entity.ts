import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export default class Otp {
  @PrimaryColumn()
  phone: string;
  @Column()
  otp: string;
}
