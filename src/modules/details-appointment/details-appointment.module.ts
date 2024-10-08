import { Module } from '@nestjs/common';
import { DetailsAppointmentController } from './details-appointment.controller';
import { DetailsAppointmentService } from './details-appointment.service';
import DetailsAppointment from 'src/entities/details-appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DetailsAppointment])],
  controllers: [DetailsAppointmentController],
  providers: [DetailsAppointmentService],
})
export class DetailsAppointmentModule {}
