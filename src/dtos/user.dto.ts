import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class UserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  type: string;
  @IsNotEmpty()
  @IsNumber()
  iat: number;
}
