import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export default class CustomerDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  fullName: string;
  @IsOptional()
  @IsBoolean()
  @Expose()
  gender: boolean;
  @IsOptional()
  @IsString()
  @Expose()
  dob: string;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN')
  @Expose()
  phone: string;
  @IsOptional()
  @IsString()
  @IsEmail()
  @Expose()
  email: string;
  @IsOptional()
  @IsString()
  @Expose()
  address: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  accountId: number;
}
