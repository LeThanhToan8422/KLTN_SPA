import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { BedService } from './bed.service';
import { validate } from 'class-validator';
import BedDto from './dtos/bed.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/decorators/public.decorator';

@Controller('bed')
export class BedController {
  constructor(private readonly bedService: BedService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const bedDto = await plainToInstance(BedDto, req.body);
    const errors = await validate(bedDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.bedService.create(bedDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const bedDto = await plainToInstance(BedDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(bedDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.bedService.update(bedDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.bedService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER, Role.EMPLOYEE)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get()
  async getAll(@Req() req: Request) {
    return await this.bedService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER, Role.EMPLOYEE)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.bedService.getById(Number(req.params.id));
  }

  @Public()
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get('service/beds')
  async getBedsByServiceAndDate(@Req() req: Request) {
    const { branchId, date, roomId } = req.query;
    return await this.bedService.getBedsByServiceAndDate(
      Number(branchId),
      date + '',
      Number(roomId),
    );
  }
}
