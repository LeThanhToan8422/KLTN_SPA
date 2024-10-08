import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Schedule from 'src/entities/schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
