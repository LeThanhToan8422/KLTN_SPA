import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class ServiceDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  duration: number;
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
  @IsOptional()
  @IsNumber()
  @Expose()
  serviceCategoryId: number;
}
