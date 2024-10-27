import { Module } from '@nestjs/common';
import { DetailEventController } from './detail-event.controller';
import { DetailEventService } from './detail-event.service';

@Module({
  controllers: [DetailEventController],
  providers: [DetailEventService]
})
export class DetailEventModule {}
