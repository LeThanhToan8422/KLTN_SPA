import { Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class BranchDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Expose()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  address: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
}
