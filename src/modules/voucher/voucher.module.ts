import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import Voucher from 'src/entities/voucher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { S3Service } from 'src/services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  controllers: [VoucherController],
  providers: [VoucherService, S3Service],
})
export class VoucherModule {}
