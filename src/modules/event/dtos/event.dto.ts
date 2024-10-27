import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class EventDto {
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
  startDate: string;
  @IsOptional()
  @IsString()
  @Expose()
  expiryDate: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
}
