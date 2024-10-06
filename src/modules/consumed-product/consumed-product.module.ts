import { Module } from '@nestjs/common';
import { ConsumedProductController } from './consumed-product.controller';
import { ConsumedProductService } from './consumed-product.service';

@Module({
  controllers: [ConsumedProductController],
  providers: [ConsumedProductService]
})
export class ConsumedProductModule {}
