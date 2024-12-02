import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class AppoinmentDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  dateTime: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  customerId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  branchId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  bonusId: number;
  @IsOptional()
  @IsString()
  @IsIn(['canceled', 'unpaid', 'paid'])
  @Expose()
  status: string;
}
