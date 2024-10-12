import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { WorkingTimeService } from './working-time.service';
import { Public } from 'src/decorators/public.decorator';
import { plainToInstance } from 'class-transformer';
import WorkingTimeDto from './dtos/working-time.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Request } from 'express';

@Controller('working-time')
export class WorkingTimeController {
  constructor(private readonly workingTimeService: WorkingTimeService) {}

  @Public()
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

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.workingTimeService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.workingTimeService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.workingTimeService.getById(Number(req.params.id));
  }

  @Public()
  @Get('service/times')
  async getWorkingTimeByServiceIdAndDate(@Req() req: Request) {
    const { branchId, serviceId, date } = req.query;
    return await this.workingTimeService.getWorkingTimeByServiceIdAndDate(
      Number(branchId),
      Number(serviceId),
      date + '',
    );
  }
}
