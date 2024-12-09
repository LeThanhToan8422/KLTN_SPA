import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { OtpService } from './otp.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Throttle } from '@nestjs/throttler';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import OtpDto from './dtos/otp.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Public } from 'src/decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Controller('otp')
export class OtpController {
  constructor(
    private readonly otpService: OtpService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Post('send-otp')
  async sendOtp(@Req() req: Request) {
    const accountSid = this.configService.get<string>('ACCOUNT_SID');
    const authToken = this.configService.get<string>('AUTH_TOKEN');
    const fromPhone = this.configService.get<string>('FROM_PHONE');
    const otp = Math.floor(100000 + Math.random() * 900000);

    const client = require('twilio')(accountSid, authToken);

    await client.messages
      .create({
        body: `Your otp is ${otp}`,
        to: '+84329623380',
        from: fromPhone,
      })
      .then((message) => console.log(message.sid));

    return await this.otpService.sendOtp(
      plainToInstance(OtpDto, {
        phone: req.body.phone,
        otp: otp,
      }),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const otpDto = await plainToInstance(OtpDto, req.body);
    const errors = await validate(otpDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.otpService.create(otpDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const otpDto = await plainToInstance(OtpDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(otpDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.otpService.update(otpDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':phone')
  async delete(@Req() req: Request) {
    return await this.otpService.delete(req.params.phone);
  }

  @Public()
  @Get(':phone')
  async getByPhone(@Req() req: Request) {
    return await this.otpService.getByPhone(req.params.phone);
  }
}
