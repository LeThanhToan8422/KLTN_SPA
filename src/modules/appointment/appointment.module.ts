import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Appointment from 'src/entities/appointment.entity';
import { CustomerService } from '../customer/customer.service';
import Customer from 'src/entities/customer.entity';
import AppointmentDetail from 'src/entities/appointment-detail.entity';
import { AppointmentDetailService } from '../appointment-detail/appointment-detail.service';
import { CustomerGiftService } from '../customer-gift/customer-gift.service';
import CustomerGift from 'src/entities/customer-gift.entity';
import MyGateWay from './gateway';
import CustomerPoint from 'src/entities/customer-point.entity';
import Bonus from 'src/entities/bonus.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Appointment,
      Customer,
      AppointmentDetail,
      CustomerGift,
      CustomerPoint,
      Bonus,
    ]),
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    CustomerService,
    AppointmentDetailService,
    CustomerGiftService,
    MyGateWay,
  ],
})
export class AppointmentModule {}
