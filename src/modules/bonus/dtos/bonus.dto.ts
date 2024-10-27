import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class BonusDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  point: number;
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
}
