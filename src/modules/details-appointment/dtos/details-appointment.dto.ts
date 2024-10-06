import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class DetailsAppointmentDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  timeIn: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  timeOut: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  appointmentId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  serviceId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  bedId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  employeeId: number;
}
