import { Module } from '@nestjs/common';
import { BedService } from './bed.service';
import { BedController } from './bed.controller';

@Module({
  controllers: [BedController],
  providers: [BedService],
})
export class BedModule {}
