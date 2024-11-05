import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class VoucherDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  discount: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  minimumOrder: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  maximumDiscount: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  expiryDate: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  point: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
}
