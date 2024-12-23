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
import { Public } from 'src/decorators/public.decorator';
import { StatusAppoiment } from 'src/enums/status-appointment.enum';

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

  // @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.appointmentDetailService.getAll(
      Number(req.query.appointmentId),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.appointmentDetailService.getById(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id/status')
  async updateStatus(@Req() req: Request) {
    const { status } = req.body;
    let stt = StatusAppoiment.CANCELED;
    if (
      !['confirmed', 'implement', 'finished', 'canceled', 'paid'].includes(
        status + '',
      )
    ) {
      return ErrorCustomizer.BadRequestError(
        `Invalid status value: ${status}. Allowed values are 'confirmed', 'implement', 'finished', 'canceled'.`,
      );
    } else {
      if (status === 'confirmed') {
        stt = StatusAppoiment.CONFIRMED;
      } else if (status === 'implement') {
        stt = StatusAppoiment.IMPLEMENT;
      } else if (status === 'finished') {
        stt = StatusAppoiment.FINISHED;
      } else if (status === 'paid') {
        stt = StatusAppoiment.PAID;
      } else {
        stt = StatusAppoiment.CANCELED;
      }
    }
    return await this.appointmentDetailService.updateStatus(
      Number(req.params.id),
      stt,
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put('appointment/:appointmentId/status')
  async updateStatusByAppointmentId(@Req() req: Request) {
    const { status } = req.body;
    let stt = StatusAppoiment.CANCELED;
    if (
      !['confirmed', 'implement', 'finished', 'canceled', 'paid'].includes(
        status + '',
      )
    ) {
      return ErrorCustomizer.BadRequestError(
        `Invalid status value: ${status}. Allowed values are 'confirmed', 'implement', 'finished', 'canceled'.`,
      );
    } else {
      if (status === 'confirmed') {
        stt = StatusAppoiment.CONFIRMED;
      } else if (status === 'implement') {
        stt = StatusAppoiment.IMPLEMENT;
      } else if (status === 'finished') {
        stt = StatusAppoiment.FINISHED;
      } else if (status === 'paid') {
        stt = StatusAppoiment.PAID;
      } else {
        stt = StatusAppoiment.CANCELED;
      }
    }
    return await this.appointmentDetailService.updateStatusByAppointmentId(
      Number(req.params.appointmentId),
      stt,
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('statistic/service')
  async getStatisticAppointmentDetailByServiceId(@Req() req: Request) {
    const { serviceId, branchId, month, year } = req.query;
    return await this.appointmentDetailService.getStatisticAppointmentDetailByServiceId(
      Number(serviceId),
      Number(branchId),
      Number(month),
      Number(year),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('statistic/employee')
  async getStatisticAppointmentDetailByEmployeeId(@Req() req: Request) {
    const { employeeId, branchId, month, year } = req.query;
    return await this.appointmentDetailService.getStatisticAppointmentDetailByEmployeeId(
      Number(employeeId),
      Number(branchId),
      Number(month),
      Number(year),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('statistic/product')
  async getStatisticAppointmentDetailByProductId(@Req() req: Request) {
    const { productId, branchId, month, year } = req.query;
    return await this.appointmentDetailService.getStatisticAppointmentDetailByProductId(
      Number(productId),
      Number(branchId),
      Number(month),
      Number(year),
    );
  }
}
