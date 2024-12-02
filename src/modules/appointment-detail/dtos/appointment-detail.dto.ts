import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class AppointmentDetailDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @IsIn([, 'confirmed', 'implement', 'finished', 'canceled'])
  @Expose()
  status: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['services', 'treatments', 'products'])
  @Expose()
  category: string;
  @IsOptional()
  @IsString()
  @Expose()
  time: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  expense: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  foreignKeyId: number;
  @IsOptional()
  @IsNumber()
  @Expose()
  employeeId: number;
  @IsOptional()
  @IsNumber()
  @Expose()
  bedId: number;
  @IsOptional()
  @IsNumber()
  @Expose()
  appointmentId: number;
}
