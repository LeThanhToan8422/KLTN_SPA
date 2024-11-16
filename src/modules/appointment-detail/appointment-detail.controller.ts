import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { AppointmentDetailService } from './appointment-detail.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import AppoinmentDetailDto from './dtos/appointment-detail.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('appointment-detail')
export class AppointmentDetailController {
  constructor(
    private readonly appointmentDetailService: AppointmentDetailService,
  ) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const appoinmentDetailDto = await plainToInstance(
      AppoinmentDetailDto,
      req.body,
    );
    const errors = await validate(appoinmentDetailDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.appointmentDetailService.create(appoinmentDetailDto);
  }

  @Public()
  @Put(':id')
  async update(@Req() req: Request) {
    const appoinmentDetailDto = await plainToInstance(AppoinmentDetailDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(appoinmentDetailDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.appointmentDetailService.update(appoinmentDetailDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.appointmentDetailService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.appointmentDetailService.getAll(
      Number(req.query.branchId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.appointmentDetailService.getById(Number(req.params.id));
  }
}
