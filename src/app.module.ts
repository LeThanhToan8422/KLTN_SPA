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
import { AppointmentModule } from './modules/appointment/appointment.module';
import { BedModule } from './modules/bed/bed.module';
import { BranchModule } from './modules/branch/branch.module';
import { CardHistoryModule } from './modules/card-history/card-history.module';
import { ConsumedProductModule } from './modules/consumed-product/consumed-product.module';
import { DetailsAppointmentModule } from './modules/details-appointment/details-appointment.module';
import { InternalExpenseModule } from './modules/internal-expense/internal-expense.module';
import { PrepaidCardModule } from './modules/prepaid-card/prepaid-card.module';
import { PricesModule } from './modules/prices/prices.module';
import { RoomModule } from './modules/room/room.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ProductModule } from './modules/product/product.module';
import { ServiceCategoryModule } from './modules/service-category/service-category.module';
import { ServiceModule } from './modules/service/service.module';
import { VoucherCategoryModule } from './modules/voucher-category/voucher-category.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { WageModule } from './modules/wage/wage.module';
import { WorkingTimeModule } from './modules/working-time/working-time.module';
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
    AppointmentModule,
    BedModule,
    BranchModule,
    CardHistoryModule,
    ConsumedProductModule,
    DetailsAppointmentModule,
    InternalExpenseModule,
    PrepaidCardModule,
    PricesModule,
    RoomModule,
    ScheduleModule,
    ProductModule,
    ServiceCategoryModule,
    ServiceModule,
    VoucherCategoryModule,
    VoucherModule,
    WageModule,
    WorkingTimeModule,
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
