import { Module } from '@nestjs/common';
import { BedService } from './bed.service';
import { BedController } from './bed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bed from 'src/entities/bed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bed])],
  controllers: [BedController],
  providers: [BedService],
})
export class BedModule {}
