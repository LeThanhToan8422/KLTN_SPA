import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class EmployeeSalaryDto {
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
  @IsIn(['admin', 'manager', 'employee'])
  @Expose()
  role: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  salary: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  commission: number;
}
