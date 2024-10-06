import { Module } from '@nestjs/common';
import { PrepaidCardController } from './prepaid-card.controller';
import { PrepaidCardService } from './prepaid-card.service';

@Module({
  controllers: [PrepaidCardController],
  providers: [PrepaidCardService]
})
export class PrepaidCardModule {}
