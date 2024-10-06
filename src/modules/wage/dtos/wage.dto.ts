import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class WageDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  hourlyRate: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  effectiveDate: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'manager', 'employee'])
  @Expose()
  role: string;
}
