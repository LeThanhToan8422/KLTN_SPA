import { S3Service } from './../../services/s3.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import AccountDto from './dtos/account.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Public } from 'src/decorators/public.decorator';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/decorators/roles.decorator';
import CustomerDto from '../customer/dtos/customer.dto';
import EmployeeDto from '../employee/dtos/employee.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly s3Service: S3Service,
  ) {}

  @Public()
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Post('login')
  async login(@Req() req: Request) {
    return await this.accountService.login(req.body.phone, req.body.password);
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('register')
  @UseInterceptors(FileInterceptor('file'))
  async register(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    const dataParse = JSON.parse(data);
    const account = dataParse.account;
    const employee = dataParse.employee;
    const customer = dataParse.customer;

    if (file) {
      if (employee) {
        employee.image = await this.s3Service.uploadFile(file);
      } else {
        customer.image = await this.s3Service.uploadFile(file);
      }
    }
    const accountDto = account ? plainToInstance(AccountDto, account) : null;
    const customerDto = customer
      ? plainToInstance(CustomerDto, customer)
      : null;
    const employeeDto = employee
      ? plainToInstance(EmployeeDto, employee)
      : null;
    return await this.accountService.register(
      accountDto,
      customerDto,
      employeeDto,
    );
  }

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const accountDto = await plainToInstance(AccountDto, req.body);
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
    return await this.accountService.create(accountDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const accountDto = await plainToInstance(AccountDto, {
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
    return await this.accountService.update(accountDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.accountService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get()
  async getAll(@Req() req: Request) {
    return await this.accountService.getAll(
      Number(req.query.branchId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE, Role.CUSTOMER)
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.accountService.getById(Number(req.params.id));
  }

  @Public()
  @Throttle({ default: { limit: 30, ttl: 60000 } })
  @Get('phone/:phone')
  async checkAccountByPhone(@Req() req: Request) {
    return await this.accountService.checkAccountByPhone(req.params.phone);
  }
}
