import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class ProductDto {
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
  @Expose()
  status: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  serviceCategoryId: number;
}
