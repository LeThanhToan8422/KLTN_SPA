import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class AppoinmentDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  dateTime: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  employeeId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  customerId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  branchId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  bonusId: number;
}
