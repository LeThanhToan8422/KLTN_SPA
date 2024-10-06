import { Module } from '@nestjs/common';
import { InternalExpenseController } from './internal-expense.controller';
import { InternalExpenseService } from './internal-expense.service';

@Module({
  controllers: [InternalExpenseController],
  providers: [InternalExpenseService]
})
export class InternalExpenseModule {}
