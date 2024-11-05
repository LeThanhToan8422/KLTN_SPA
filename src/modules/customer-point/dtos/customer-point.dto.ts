import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class CustomerPointDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  expenditures: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  accumulationPoints: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  currentPoints: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  customerId: number;
}
