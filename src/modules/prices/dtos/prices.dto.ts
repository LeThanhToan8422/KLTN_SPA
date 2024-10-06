import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class PricesDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  originalPrice: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  specialPrice: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  commission: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  vat: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  applicableDate: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  type: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  foreignKeyId: number;
}
