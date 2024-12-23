import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from 'src/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { CustomerService } from '../customer/customer.service';
import Customer from 'src/entities/customer.entity';
import { EmployeeService } from '../employee/employee.service';
import Employee from 'src/entities/employee.entity';
import { S3Service } from 'src/services/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Customer, Employee])],
  controllers: [AccountController],
  providers: [
    AccountService,
    JwtService,
    CustomerService,
    EmployeeService,
    S3Service,
  ],
})
export class AccountModule {}
