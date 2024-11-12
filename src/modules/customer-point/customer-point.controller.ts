import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CustomerPointService } from './customer-point.service';
import CustomerPointDto from './dtos/customer-point.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('customer-point')
export class CustomerPointController {
  constructor(private readonly customerPointService: CustomerPointService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  async create(@Req() req: Request) {
    const customerPointDto = await plainToInstance(CustomerPointDto, req.body);
    const errors = await validate(customerPointDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.customerPointService.create(customerPointDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const customerPointDto = await plainToInstance(CustomerPointDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(customerPointDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.customerPointService.update(customerPointDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.customerPointService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.customerPointService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.customerPointService.getById(Number(req.params.id));
  }

  @Get('customer/:customerId')
  async getByCustomerId(@Req() req: Request) {
    return await this.customerPointService.getByCustomerId(
      Number(req.params.customerId),
    );
  }
}
