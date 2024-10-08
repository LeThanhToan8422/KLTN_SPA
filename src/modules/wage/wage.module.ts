import { Module } from '@nestjs/common';
import { WageController } from './wage.controller';
import { WageService } from './wage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Wage from 'src/entities/Wage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wage])],
  controllers: [WageController],
  providers: [WageService],
})
export class WageModule {}
