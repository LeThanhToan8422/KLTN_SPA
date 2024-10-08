import { Module } from '@nestjs/common';
import { CardHistoryController } from './card-history.controller';
import { CardHistoryService } from './card-history.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import CardHistory from 'src/entities/card-history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CardHistory])],
  controllers: [CardHistoryController],
  providers: [CardHistoryService],
})
export class CardHistoryModule {}
