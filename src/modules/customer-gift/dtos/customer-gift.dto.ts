import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CustomerGiftDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @IsIn(['gift', 'voucher'])
  @Expose()
  category: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['used', 'notused'])
  @Expose()
  status: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  customerId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  giftId: number;
}
