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
import UpdateStatusDto from 'src/dtos/update-status.dto';

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
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('update-status')
  async updateStatus(@Req() req: Request) {
    const updateStatusDto = await plainToInstance(UpdateStatusDto, {
      id: req.query.id,
      status: req.query.status,
    });
    return await this.bedService.updateStatus(updateStatusDto);
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
  @Get()
  async getAll(@Req() req: Request) {
    return await this.bedService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER, Role.EMPLOYEE)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.bedService.getById(Number(req.params.id));
  }

  @Public()
  @Get('service/beds')
  async getBedsByServiceAndDate(@Req() req: Request) {
    const { branchId, date, roomId } = req.query;
    return await this.bedService.getBedsByServiceAndDate(
      Number(branchId),
      date + '',
      Number(roomId),
    );
  }

  @Roles(Role.ADMIN)
  @Get('room/:id')
  async getByRoomId(@Req() req: Request) {
    return await this.bedService.getByRoomId(Number(req.params.id));
  }
}
