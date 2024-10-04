import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import Account from 'src/entities/account.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService, JwtService],
})
export class AccountModule {}
