import { Module } from '@nestjs/common';
import { InternalExpenseController } from './internal-expense.controller';
import { InternalExpenseService } from './internal-expense.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import InternalExpense from 'src/entities/internal-expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InternalExpense])],
  controllers: [InternalExpenseController],
  providers: [InternalExpenseService],
})
export class InternalExpenseModule {}
