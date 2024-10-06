import { Module } from '@nestjs/common';
import { DetailsAppointmentController } from './details-appointment.controller';
import { DetailsAppointmentService } from './details-appointment.service';

@Module({
  controllers: [DetailsAppointmentController],
  providers: [DetailsAppointmentService]
})
export class DetailsAppointmentModule {}
