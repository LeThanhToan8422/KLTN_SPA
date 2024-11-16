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
  @IsNumber()
  @Expose()
  expense: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  foreignKeyId: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  bedId: number;
  @IsOptional()
  @IsNumber()
  @Expose()
  appointmentId: number;
}
