import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { AppointmentDetailService } from './appointment-detail.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import AppoinmentDetailDto from './dtos/appointment-detail.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('appointment-detail')
export class AppointmentDetailController {
  constructor(
    private readonly appointmentDetailService: AppointmentDetailService,
  ) {}

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
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

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
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

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.appointmentDetailService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get()
  async getAll(@Req() req: Request) {
    return await this.appointmentDetailService.getAll(
      Number(req.query.appointmentId),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.appointmentDetailService.getById(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id/status')
  async updateStatus(@Req() req: Request) {
    const { status } = req.body;
    if (!['confirmed', 'implement', 'finished', 'canceled'].includes(status)) {
      return ErrorCustomizer.BadRequestError(
        `Invalid status value: ${status}. Allowed values are 'confirmed', 'implement', 'finished', 'canceled'.`,
      );
    }
    return await this.appointmentDetailService.updateStatus(
      Number(req.params.id),
      status,
    );
  }
}
