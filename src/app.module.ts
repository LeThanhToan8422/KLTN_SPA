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
import { ConsumedProductModule } from './modules/consumed-product/consumed-product.module';
import { InternalExpenseModule } from './modules/internal-expense/internal-expense.module';
import { PricesModule } from './modules/prices/prices.module';
import { RoomModule } from './modules/room/room.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { ProductModule } from './modules/product/product.module';
import { ServiceCategoryModule } from './modules/service-category/service-category.module';
import { ServiceModule } from './modules/service/service.module';
import { VoucherModule } from './modules/voucher/voucher.module';
import { WageModule } from './modules/wage/wage.module';
import { WorkingTimeModule } from './modules/working-time/working-time.module';
import { BonusModule } from './modules/bonus/bonus.module';
import { EventModule } from './modules/event/event.module';
import { DetailEventModule } from './modules/detail-event/detail-event.module';
import { DetailServiceModule } from './modules/detail-service/detail-service.module';
import { GiftModule } from './modules/gift/gift.module';
import { CustomerPointModule } from './modules/customer-point/customer-point.module';
import { CustomerGiftModule } from './modules/customer-gift/customer-gift.module';
import { AppointmentDetailModule } from './modules/appointment-detail/appointment-detail.module';
import Customer from './entities/customer.entity';
import Employee from './entities/employee.entity';
import { ThrottlerModule } from '@nestjs/throttler';
import { CustomThrottlerGuard } from './guards/custom-throttler.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: 3306,
        username: configService.get<string>('DB_USERNAME', 'root'),
        password: configService.get<string>('DB_PASSWORD', 'sapassword'),
        database: configService.get<string>('DB_NAME', 'kltn_spa'),
        entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Lấy secret từ file .env
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRATION') }, // Lấy thời gian hết hạn từ file .env
      }),
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 300,
      },
    ]),
    AccountModule,
    CustomerModule,
    EmployeeModule,
    TypeOrmModule.forFeature([Customer, Employee]),
    AppointmentModule,
    BedModule,
    BranchModule,
    ConsumedProductModule,
    InternalExpenseModule,
    PricesModule,
    RoomModule,
    ScheduleModule,
    ProductModule,
    ServiceCategoryModule,
    ServiceModule,
    VoucherModule,
    WageModule,
    WorkingTimeModule,
    BonusModule,
    EventModule,
    DetailEventModule,
    DetailServiceModule,
    GiftModule,
    CustomerPointModule,
    CustomerGiftModule,
    AppointmentDetailModule,
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
    {
      provide: APP_GUARD,
      useClass: CustomThrottlerGuard,
    },
    CustomerService,
    EmployeeService,
  ],
})
export class AppModule {}
