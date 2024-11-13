import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { InternalExpenseService } from './internal-expense.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import InternalExpenseDto from './dtos/internal-expense.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('internal-expense')
export class InternalExpenseController {
  constructor(
    private readonly internalExpenseService: InternalExpenseService,
  ) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const internalExpenseDto = await plainToInstance(
      InternalExpenseDto,
      req.body,
    );
    const errors = await validate(internalExpenseDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.internalExpenseService.create(internalExpenseDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const internalExpenseDto = await plainToInstance(InternalExpenseDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(internalExpenseDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.internalExpenseService.update(internalExpenseDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.internalExpenseService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.internalExpenseService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get('expense/:branchId')
  async getExpenseByMonthYear(@Req() req: Request) {
    return await this.internalExpenseService.getExpenseByMonthYear(
      Number(req.query.month),
      Number(req.query.year),
      Number(req.params.branchId),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.internalExpenseService.getById(Number(req.params.id));
  }
}
