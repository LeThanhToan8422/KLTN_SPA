import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export default class OtpDto {
  @IsNotEmpty()
  @IsString()
  @Expose()
  phone: string;
  @IsNotEmpty()
  @IsString()
  @Expose()
  otp: string;
}
