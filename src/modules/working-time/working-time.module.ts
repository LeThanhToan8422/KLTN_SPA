import { Module } from '@nestjs/common';
import { WorkingTimeController } from './working-time.controller';
import { WorkingTimeService } from './working-time.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import WorkingTime from 'src/entities/working-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkingTime])],
  controllers: [WorkingTimeController],
  providers: [WorkingTimeService],
})
export class WorkingTimeModule {}
