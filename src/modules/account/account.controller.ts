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

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Public()
  @Post('login')
  async login(@Req() req: Request) {
    return await this.accountService.login(req.body.phone, req.body.password);
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

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.accountService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.EMPLOYEE)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.accountService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.accountService.getById(Number(req.params.id));
  }

  @Get('phone/:phone')
  async checkAccountByPhone(@Req() req: Request) {
    return await this.accountService.checkAccountByPhone(req.params.phone);
  }
}
