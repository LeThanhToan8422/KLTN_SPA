import { Module } from '@nestjs/common';
import { DetailServiceController } from './detail-service.controller';
import { DetailServiceService } from './detail-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import DetailService from 'src/entities/detail-service.entity';
import { S3Service } from 'src/services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([DetailService])],
  controllers: [DetailServiceController],
  providers: [DetailServiceService, S3Service],
})
export class DetailServiceModule {}
