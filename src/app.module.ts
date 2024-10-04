import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AccountModule } from './modules/account/account.module';
import { CustomerModule } from './modules/customer/customer.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from './guards/auth.guard';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RolesGuard } from './guards/roles.guard';
import { CustomerService } from './modules/customer/customer.service';
import { EmployeeService } from './modules/employee/employee.service';
import Customer from './entities/customer.entity';
import Employee from './entities/employee.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Đảm bảo rằng ConfigModule được sử dụng toàn cục
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'sapassword',
      database: 'kltn_spa',
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: true,
    }),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Lấy secret từ file .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }, // Lấy thời gian hết hạn từ file .env
      }),
    }),
    AccountModule,
    CustomerModule,
    EmployeeModule,
    TypeOrmModule.forFeature([Customer, Employee]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard, // Sử dụng AuthGuard toàn cục
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    CustomerService,
    EmployeeService,
  ],
})
export class AppModule {}
