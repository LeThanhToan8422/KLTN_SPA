import { Module } from '@nestjs/common';
import { BonusController } from './bonus.controller';
import { BonusService } from './bonus.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Bonus from 'src/entities/bonus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bonus])],
  controllers: [BonusController],
  providers: [BonusService],
})
export class BonusModule {}
