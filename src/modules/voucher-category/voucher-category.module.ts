import { Module } from '@nestjs/common';
import { VoucherCategoryController } from './voucher-category.controller';
import { VoucherCategoryService } from './voucher-category.service';

@Module({
  controllers: [VoucherCategoryController],
  providers: [VoucherCategoryService]
})
export class VoucherCategoryModule {}
