import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class CardHistoryDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  expense: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  content: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  date: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  prepaidCardId: number;
}
