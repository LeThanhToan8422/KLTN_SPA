import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class GiftDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  content: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  point: number;
  @IsNotEmpty()
  @IsNumber()
  @IsIn(['product', 'voucher'])
  @Expose()
  category: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
}
