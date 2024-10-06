import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class VoucherDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  code: string;
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
  @IsNumber()
  @Expose()
  voucherCategoryId: number;
}
