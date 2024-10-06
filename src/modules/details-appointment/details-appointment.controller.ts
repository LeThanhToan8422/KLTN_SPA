import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { DetailsAppointmentService } from './details-appointment.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import DetailsAppointmentDto from './dtos/details-appointment.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('details-appointment')
export class DetailsAppointmentController {
  constructor(
    private readonly detailsAppointmentService: DetailsAppointmentService,
  ) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const detailsAppointmentDto = await plainToInstance(
      DetailsAppointmentDto,
      req.body,
    );
    const errors = await validate(detailsAppointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.detailsAppointmentService.create(detailsAppointmentDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const detailsAppointmentDto = await plainToInstance(DetailsAppointmentDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(detailsAppointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.detailsAppointmentService.update(detailsAppointmentDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.detailsAppointmentService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.detailsAppointmentService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.detailsAppointmentService.getById(Number(req.params.id));
  }
}
