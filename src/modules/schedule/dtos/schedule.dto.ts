import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class ScheduleDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  day: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  date: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['morning', 'afternoon'])
  @Expose()
  shift: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  checkInTime: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  checkOutTime: string;
  // @IsNotEmpty()
  // @IsString()
  // @Expose()
  // startTime: string;
  // @IsNotEmpty()
  // @IsString()
  // @Expose()
  // endTime: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  employeeId: number;
}
