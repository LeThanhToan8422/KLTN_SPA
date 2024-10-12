import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsString()
  @IsIn(['not_comfirm', 'confirmed', 'performing', 'finished', 'cancelled'])
  @Expose()
  status: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['services', 'treatments'])
  @Expose()
  category: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  serviceOrTreatmentId: number;
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
}
