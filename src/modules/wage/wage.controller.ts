import { Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { WageService } from './wage.service';
import { plainToInstance } from 'class-transformer';
import WageDto from './dtos/wage.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { RoleEmployee } from 'src/enums/role-employee.enum';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('wage')
export class WageController {
  constructor(private readonly wageService: WageService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const wageDto = await plainToInstance(WageDto, req.body);
    const errors = await validate(wageDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.wageService.create(wageDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const wageDto = await plainToInstance(WageDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(wageDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.wageService.update(wageDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.wageService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.wageService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.wageService.getById(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('role/:role')
  async getByRole(@Param('role') role: string) {
    return await this.wageService.getByRole(role as RoleEmployee);
  }
}
