import { Module } from '@nestjs/common';
import { GiftController } from './gift.controller';
import { GiftService } from './gift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Gift from 'src/entities/gift.entity';
import { S3Service } from 'src/services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Gift])],
  controllers: [GiftController],
  providers: [GiftService, S3Service],
})
export class GiftModule {}
