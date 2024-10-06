import { Module } from '@nestjs/common';
import { CardHistoryController } from './card-history.controller';
import { CardHistoryService } from './card-history.service';

@Module({
  controllers: [CardHistoryController],
  providers: [CardHistoryService]
})
export class CardHistoryModule {}
