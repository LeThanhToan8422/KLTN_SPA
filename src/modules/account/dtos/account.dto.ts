import { Exclude, Expose } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export default class AccountDto {
  @IsOptional()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('VN')
  @Expose()
  phone: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{4,}$/, {
    message:
      'Password is required and must be at least 4 characters long, containing letters, numbers, and special characters.',
  })
  @Exclude({ toPlainOnly: true })
  @Expose()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsIn(['employee', 'customer'])
  @Expose()
  type: string;
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  @Expose()
  status: string;
}
