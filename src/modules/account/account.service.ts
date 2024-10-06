import { ResponseCustomizer } from './../../helpers/response-customizer.response';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from 'src/entities/account.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import AccountDto from './dtos/account.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { Pagination } from 'src/helpers/pagination';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import CustomerDto from '../customer/dtos/customer.dto';
import { CustomerService } from '../customer/customer.service';
import EmployeeDto from '../employee/dtos/employee.dto';
import { EmployeeService } from '../employee/employee.service';

@Injectable()
export class AccountService {
  private crudRepository: CRUDRepository<Account>;
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    private readonly jwtService: JwtService,
    private readonly customerService: CustomerService,
    private readonly employeeService: EmployeeService,
    private datasource: DataSource,
    private configService: ConfigService,
  ) {
    this.crudRepository = new CRUDRepository<Account>(accountRepository);
  }

  async create(accountDto: AccountDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      accountDto.password = await this.hashPassword(accountDto.password);
      const createdItem = await this.crudRepository.create(accountDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AccountDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(accountDto: AccountDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      accountDto.password = await this.hashPassword(accountDto.password);
      const savedItem = await this.crudRepository.update(accountDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AccountDto, savedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async delete(id: number) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const removedItem = await this.crudRepository.delete(id);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AccountDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async getAll(page: number, limit: number) {
    const paginatedResult = await this.crudRepository.getAll(page, limit);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AccountDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AccountDto, response)),
    );
  }

  async checkAccountByPhone(phone: string) {
    const response = await this.accountRepository.findOne({
      where: {
        phone: phone,
      },
    });

    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AccountDto, response)),
    );
  }

  async getByPhone(phone: string) {
    return await this.accountRepository.findOne({
      where: {
        phone: phone,
      },
    });
  }

  async hashPassword(password: string) {
    return await bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  async login(phone: string, password: string) {
    const account = await this.getByPhone(phone);
    if (account) {
      if (bcrypt.compareSync(password, account.password)) {
        return ResponseCustomizer.success({
          access_token: await this.jwtService.signAsync(
            instanceToPlain(plainToInstance(AccountDto, account)),
            {
              secret: this.configService.get<string>('JWT_SECRET'),
            },
          ),
        });
      } else {
        return ResponseCustomizer.error(
          ErrorCustomizer.PasswordIncorrectError('Password is incorrect'),
        );
      }
    } else {
      return ResponseCustomizer.error(
        ErrorCustomizer.NotFoundError('Account not found'),
      );
    }
  }

  async register(
    type: string,
    accountDto: AccountDto,
    customerDto: CustomerDto,
    employeeDto: EmployeeDto,
  ) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      if (accountDto) {
        const accountResponse = await this.create(accountDto);
        const accountDtoResponse = plainToInstance(
          AccountDto,
          accountResponse.data,
        );
        if (type === 'customer' && customerDto) {
          const customerResponse = await this.customerService.create({
            ...customerDto,
            accountId: accountDtoResponse.id,
          });
          await queryRunner.commitTransaction();
          return ResponseCustomizer.success({
            account: instanceToPlain(
              plainToInstance(AccountDto, accountDtoResponse),
            ),
            customer: instanceToPlain(
              plainToInstance(CustomerDto, customerResponse.data),
            ),
          });
        } else {
          const employeeResponse = await this.employeeService.create({
            ...employeeDto,
            accountId: accountDtoResponse.id,
          });
          await queryRunner.commitTransaction();
          return ResponseCustomizer.success({
            account: instanceToPlain(
              plainToInstance(AccountDto, accountDtoResponse),
            ),
            employee: instanceToPlain(
              plainToInstance(EmployeeDto, employeeResponse.data),
            ),
          });
        }
      }
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }
}
