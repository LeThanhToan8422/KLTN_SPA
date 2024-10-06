import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { EmployeeService } from './employee.service';
import { plainToInstance } from 'class-transformer';
import EmployeeDto from './dtos/employee.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Public()
  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  async create(@Req() req: Request) {
    const accountDto = await plainToInstance(EmployeeDto, req.body);
    const errors = await validate(accountDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.employeeService.create(accountDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const accountDto = await plainToInstance(EmployeeDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(accountDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.employeeService.update(accountDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.employeeService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.employeeService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.employeeService.getById(Number(req.params.id));
  }

  @Get('account/:id')
  async getByAccountId(@Req() req: Request) {
    return await this.employeeService.getByAccountId(Number(req.params.id));
  }
}
