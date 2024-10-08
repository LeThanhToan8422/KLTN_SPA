import { Module } from '@nestjs/common';
import { VoucherCategoryController } from './voucher-category.controller';
import { VoucherCategoryService } from './voucher-category.service';
import VoucherCategory from 'src/entities/voucher-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherCategory])],
  controllers: [VoucherCategoryController],
  providers: [VoucherCategoryService],
})
export class VoucherCategoryModule {}
