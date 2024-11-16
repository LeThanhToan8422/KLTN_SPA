import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from 'src/entities/appointment.entity';
import { CustomerService } from '../customer/customer.service';
import Customer from 'src/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment, Customer])],
  controllers: [AppointmentController],
  providers: [AppointmentService, CustomerService],
})
export class AppointmentModule {}
