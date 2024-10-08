import { Module } from '@nestjs/common';
import { PrepaidCardController } from './prepaid-card.controller';
import { PrepaidCardService } from './prepaid-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PrepaidCard from 'src/entities/prepaid-card.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrepaidCard])],
  controllers: [PrepaidCardController],
  providers: [PrepaidCardService],
})
export class PrepaidCardModule {}
