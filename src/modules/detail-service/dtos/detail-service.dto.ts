import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class DetailServiceDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  title: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  content: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  serviceId: number;
}
