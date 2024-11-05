import { Module } from '@nestjs/common';
import { CustomerPointController } from './customer-point.controller';
import { CustomerPointService } from './customer-point.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CustomerPoint from 'src/entities/customer-point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerPoint])],
  controllers: [CustomerPointController],
  providers: [CustomerPointService],
})
export class CustomerPointModule {}
