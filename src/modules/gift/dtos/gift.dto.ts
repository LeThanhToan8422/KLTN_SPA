import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class GiftDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  point: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  image: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
}
