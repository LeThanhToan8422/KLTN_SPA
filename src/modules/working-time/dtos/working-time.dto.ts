import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class WorkingTimeDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  time: string;
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
}
