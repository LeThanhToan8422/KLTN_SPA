import { S3Service } from './../../services/s3.service';
import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Events from 'src/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Events])],
  controllers: [EventController],
  providers: [EventService, S3Service],
})
export class EventModule {}
