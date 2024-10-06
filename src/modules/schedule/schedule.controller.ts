import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ScheduleDto from './dtos/schedule.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Public()
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

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.scheduleService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.scheduleService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.scheduleService.getById(Number(req.params.id));
  }
}
