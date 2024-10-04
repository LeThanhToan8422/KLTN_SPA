import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export default class EmployeeDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  fullName: string;
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  gender: boolean;
  @IsNotEmpty()
  @IsString()
  @Expose()
  dob: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN')
  @Expose()
  phone: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Expose()
  email: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  address: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['admin', 'manager', 'employee'])
  @Expose()
  role: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  accountId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  wageId: number;
}
