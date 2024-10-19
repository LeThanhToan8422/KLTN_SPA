import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class ServiceDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  duration: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  serviceCategoryId: number;
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
}
