import { Module } from '@nestjs/common';
import { ConsumedProductController } from './consumed-product.controller';
import { ConsumedProductService } from './consumed-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ConsumedProduct from 'src/entities/consumed-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ConsumedProduct])],
  controllers: [ConsumedProductController],
  providers: [ConsumedProductService],
})
export class ConsumedProductModule {}
