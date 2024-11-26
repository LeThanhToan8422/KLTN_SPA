import { Expose } from 'class-transformer';
import { IsIn, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class UpdateStatusAppointmentDto {
  @IsNotEmpty()
  @IsNumber()
  @Expose()
  id: number;
  @IsNotEmpty()
  @IsString()
  @IsIn(['canceled', 'paid', 'unpaid'])
  @Expose()
  status: string;
}
