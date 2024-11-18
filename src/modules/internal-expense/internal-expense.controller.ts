import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { InternalExpenseService } from './internal-expense.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import InternalExpenseDto from './dtos/internal-expense.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('internal-expense')
export class InternalExpenseController {
  constructor(
    private readonly internalExpenseService: InternalExpenseService,
  ) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
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

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
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

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.internalExpenseService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.internalExpenseService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('expense/:branchId')
  async getExpenseByMonthYear(@Req() req: Request) {
    return await this.internalExpenseService.getExpenseByMonthYear(
      Number(req.query.month),
      Number(req.query.year),
      Number(req.params.branchId),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.internalExpenseService.getById(Number(req.params.id));
  }
}
