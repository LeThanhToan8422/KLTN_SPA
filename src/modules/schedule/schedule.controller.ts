import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ScheduleDto from './dtos/schedule.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/decorators/public.decorator';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const scheduleDto = await plainToInstance(ScheduleDto, req.body);
    const errors = await validate(scheduleDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.scheduleService.create(scheduleDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const scheduleDto = await plainToInstance(ScheduleDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(scheduleDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.scheduleService.update(scheduleDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.scheduleService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE, Role.CUSTOMER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.scheduleService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.scheduleService.getById(Number(req.params.id));
  }

  // @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Public()
  @Get('date/week')
  async getSchedulesByDate(@Req() req: Request) {
    return await this.scheduleService.getSchedulesByDate(req.query.date + '');
  }

  @Public()
  @Get('date/week/employee/:id')
  async getSchedulesByDateByEmployeeId(@Req() req: Request) {
    return await this.scheduleService.getSchedulesByDateByEmployeeId(
      req.query.date + '',
      Number(req.params.id),
    );
  }
}
