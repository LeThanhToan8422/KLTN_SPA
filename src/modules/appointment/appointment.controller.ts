import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { AppointmentService } from './appointment.service';
import AppoinmentDto from './dtos/appoiment.dto';
import CustomerDto from '../customer/dtos/customer.dto';
import AppoinmentDetailDto from '../appointment-detail/dtos/appointment-detail.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const {
      fullName,
      phone,
      status,
      expense,
      category,
      foreignKeyId,
      bedId,
      ...appointment
    } = req.body;
    let customerDto = null;
    if (!req.body.customerId) {
      customerDto = await plainToInstance(CustomerDto, {
        fullName: fullName,
        phone: phone,
      });
      const errorss = await validate(customerDto);
      if (errorss.length > 0) {
        const messageErrorss = errorss.map((e) => {
          return {
            property: e.property,
            constraints: e.constraints,
          };
        });
        return ErrorCustomizer.BadRequestError(
          JSON.stringify(messageErrorss[0]),
        );
      }
    }
    const appointmentDetailDto = await plainToInstance(AppoinmentDetailDto, {
      status,
      expense,
      category,
      foreignKeyId,
      bedId,
    });
    const errorss = await validate(appointmentDetailDto);
    if (errorss.length > 0) {
      const messageErrorss = errorss.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrorss[0]));
    }

    const appointmentDto = await plainToInstance(AppoinmentDto, appointment);
    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.appointmentService.create(
      appointmentDto,
      customerDto,
      appointmentDetailDto,
    );
  }

  @Public()
  @Put(':id')
  async update(@Req() req: Request) {
    const appointmentDto = await plainToInstance(AppoinmentDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.appointmentService.update(appointmentDto);
  }

  @Public()
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.appointmentService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.appointmentService.getAll(
      Number(req.query.branchId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.appointmentService.getById(Number(req.params.id));
  }

  @Get('customer/:customerId')
  async getByCustomerId(@Req() req: Request) {
    const customerId = Number(req.params.customerId);
    return await this.appointmentService.getByCustomerId(customerId);
  }
}
