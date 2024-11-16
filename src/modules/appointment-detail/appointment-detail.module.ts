import { Module } from '@nestjs/common';
import { AppointmentDetailController } from './appointment-detail.controller';
import { AppointmentDetailService } from './appointment-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppointmentDetail from 'src/entities/appointment-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentDetail])],
  controllers: [AppointmentDetailController],
  providers: [AppointmentDetailService],
})
export class AppointmentDetailModule {}
