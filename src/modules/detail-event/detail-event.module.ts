import { S3Service } from './../../services/s3.service';
import { Module } from '@nestjs/common';
import { DetailEventController } from './detail-event.controller';
import { DetailEventService } from './detail-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailEvent from 'src/entities/detail-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailEvent])],
  controllers: [DetailEventController],
  providers: [DetailEventService, S3Service],
})
export class DetailEventModule {}
