import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { WorkingTimeService } from './working-time.service';
import { plainToInstance } from 'class-transformer';
import WorkingTimeDto from './dtos/working-time.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Request } from 'express';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('working-time')
export class WorkingTimeController {
  constructor(private readonly workingTimeService: WorkingTimeService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const workingTimeDto = await plainToInstance(WorkingTimeDto, req.body);
    const errors = await validate(workingTimeDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.workingTimeService.create(workingTimeDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const workingTimeDto = await plainToInstance(WorkingTimeDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(workingTimeDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.workingTimeService.update(workingTimeDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.workingTimeService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE, Role.CUSTOMER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.workingTimeService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.workingTimeService.getById(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE, Role.CUSTOMER)
  @Get('service/times')
  async getWorkingTimeByServiceIdAndDate(@Req() req: Request) {
    const { branchId, roomId, date } = req.query;
    return await this.workingTimeService.getWorkingTimeByServiceIdAndDate(
      Number(branchId),
      Number(roomId),
      date + '',
    );
  }
}
