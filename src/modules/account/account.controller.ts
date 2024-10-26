import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
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

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Public()
  @Post('login')
  async login(@Req() req: Request) {
    return await this.accountService.login(req.body.phone, req.body.password);
  }

  @Public()
  @Post('register')
  async register(@Req() req: Request) {
    const accountDto = req.body.account
      ? plainToInstance(AccountDto, req.body.account)
      : null;
    const customerDto = req.body.customer
      ? plainToInstance(CustomerDto, req.body.customer)
      : null;
    const employeeDto = req.body.employee
      ? plainToInstance(EmployeeDto, req.body.employee)
      : null;
    return await this.accountService.register(
      accountDto,
      customerDto,
      employeeDto,
    );
  }

  @Public()
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

  @Public()
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
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.accountService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.accountService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.accountService.getById(Number(req.params.id));
  }

  // @Roles(Role.ADMIN, Role.MANAGER)
  @Public()
  @Get('phone/:phone')
  async checkAccountByPhone(@Req() req: Request) {
    return await this.accountService.checkAccountByPhone(req.params.phone);
  }
}
