import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { EmployeeService } from './employee.service';
import { plainToInstance } from 'class-transformer';
import EmployeeDto from './dtos/employee.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import UserDto from 'src/dtos/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/services/s3.service';
import { Throttle } from '@nestjs/throttler';
import { Public } from 'src/decorators/public.decorator';
import UpdateStatusDto from 'src/dtos/update-status.dto';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly s3Service: S3Service,
  ) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    const dataParse = JSON.parse(data);
    if (file) {
      dataParse.image = await this.s3Service.uploadFile(file);
    }
    const employeeDto = await plainToInstance(EmployeeDto, dataParse);
    const errors = await validate(employeeDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.employeeService.create(employeeDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('update-status')
  async updateStatus(@Req() req: Request) {
    const updateStatusDto = await plainToInstance(UpdateStatusDto, {
      id: req.query.id,
      status: req.query.status,
    });
    return await this.employeeService.updateStatus(updateStatusDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
    @Param('id') id: number,
  ) {
    const dataParse = JSON.parse(data);
    if (file) {
      dataParse.image = await this.s3Service.uploadFile(file);
    }
    const employeeDto = await plainToInstance(EmployeeDto, {
      id: Number(id),
      ...dataParse,
    });

    const errors = await validate(employeeDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.employeeService.update(employeeDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.employeeService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.employeeService.getAll(
      Number(req.query.branchId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get('appointments')
  async getEmployeesByDateTime(@Req() req: Request) {
    return await this.employeeService.getEmployeesByDateTime(
      Number(req.query.branchId),
      req.query.dateTime + '',
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get('salary/:branchId')
  async getSalaryOfEmployeeByMonthYear(@Req() req: Request) {
    return await this.employeeService.getSalaryOfEmployeeByMonthYear(
      Number(req.query.month),
      Number(req.query.year),
      Number(req.params.branchId),
    );
  }

  // @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Public()
  @Get('statistic/:employeeId')
  async statisticEmployeeById(@Req() req: Request) {
    return await this.employeeService.statisticEmployeeById(
      Number(req.query.branchId),
      Number(req.params.employeeId),
      Number(req.query.month),
      Number(req.query.year),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get('details')
  async getById(@Req() req: Request) {
    const userDto = await plainToInstance(UserDto, req.user);
    return await this.employeeService.getById(Number(userDto.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get('account/:id')
  async getByAccountId(@Req() req: Request) {
    return await this.employeeService.getByAccountId(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE, Role.CUSTOMER)
  @Get(':id')
  async getByEmpId(@Req() req: Request) {
    return await this.employeeService.getById(Number(req.params.id));
  }
}
