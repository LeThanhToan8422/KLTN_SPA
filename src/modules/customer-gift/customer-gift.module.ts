import { Module } from '@nestjs/common';
import { CustomerGiftController } from './customer-gift.controller';
import { CustomerGiftService } from './customer-gift.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CustomerGift from 'src/entities/customer-gift.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerGift])],
  controllers: [CustomerGiftController],
  providers: [CustomerGiftService],
})
export class CustomerGiftModule {}
