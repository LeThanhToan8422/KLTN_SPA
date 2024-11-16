import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from 'src/entities/appointment.entity';
import { CustomerService } from '../customer/customer.service';
import Customer from 'src/entities/customer.entity';
import AppointmentDetail from 'src/entities/appointment-detail.entity';
import { AppointmentDetailService } from '../appointment-detail/appointment-detail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment, Customer, AppointmentDetail]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, CustomerService, AppointmentDetailService],
})
export class AppointmentModule {}
