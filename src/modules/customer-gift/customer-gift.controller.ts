import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { CustomerGiftService } from './customer-gift.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import CustomerGiftDto from './dtos/customer-gift.dto';
import { Throttle } from '@nestjs/throttler';

@Controller('customer-gift')
export class CustomerGiftController {
  constructor(private readonly customerGiftService: CustomerGiftService) {}

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const customerGiftDto = await plainToInstance(CustomerGiftDto, req.body);
    const errors = await validate(customerGiftDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.customerGiftService.create(customerGiftDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const customerGiftDto = await plainToInstance(CustomerGiftDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(customerGiftDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.customerGiftService.update(customerGiftDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.customerGiftService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.customerGiftService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.customerGiftService.getById(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Get('customer/:customerId')
  async getByCustomerId(@Req() req: Request) {
    return await this.customerGiftService.getByCustomerId(
      Number(req.params.customerId),
    );
  }
}
