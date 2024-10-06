import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class ConsumedProductDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  date: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  content: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  branchId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  productId: number;
}
