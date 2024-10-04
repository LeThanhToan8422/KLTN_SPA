import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
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
  @IsNotEmpty()
  @IsBoolean()
  @Expose()
  gender: boolean;
  @IsNotEmpty()
  @IsDate()
  @Expose()
  dob: Date;
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
  @IsNumber()
  @Expose()
  accountId: number;
}
