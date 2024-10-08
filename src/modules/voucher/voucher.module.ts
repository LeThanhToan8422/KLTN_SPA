import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import Voucher from 'src/entities/voucher.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Voucher])],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
