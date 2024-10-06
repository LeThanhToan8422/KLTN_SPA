import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class PrepaidCarDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  cardNumber: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  balance: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  issueDate: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  expiryDate: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive', 'expired'])
  @Expose()
  status: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  customerId: number;
}
