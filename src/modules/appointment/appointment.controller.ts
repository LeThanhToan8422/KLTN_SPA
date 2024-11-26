import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { AppointmentService } from './appointment.service';
import AppoinmentDto from './dtos/appoiment.dto';
import CustomerDto from '../customer/dtos/customer.dto';
import AppoinmentDetailDto from '../appointment-detail/dtos/appointment-detail.dto';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { Public } from 'src/decorators/public.decorator';
import * as crypto from 'crypto';
import axios from 'axios';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const {
      fullName,
      phone,
      status,
      expense,
      category,
      foreignKeyId,
      bedId,
      employeeId,
      ...appointment
    } = req.body;
    let customerDto = null;
    if (!req.body.customerId) {
      customerDto = await plainToInstance(CustomerDto, {
        fullName: fullName,
        phone: phone,
      });
      const errorss = await validate(customerDto);
      if (errorss.length > 0) {
        const messageErrorss = errorss.map((e) => {
          return {
            property: e.property,
            constraints: e.constraints,
          };
        });
        return ErrorCustomizer.BadRequestError(
          JSON.stringify(messageErrorss[0]),
        );
      }
    }
    const appointmentDetailDto = await plainToInstance(AppoinmentDetailDto, {
      status,
      expense,
      category,
      foreignKeyId,
      bedId,
      employeeId,
    });

    const errorss = await validate(appointmentDetailDto);
    if (errorss.length > 0) {
      const messageErrorss = errorss.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrorss[0]));
    }
    const appointmentDto = await plainToInstance(AppoinmentDto, appointment);
    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }

    return await this.appointmentService.create(
      appointmentDto,
      customerDto,
      appointmentDetailDto,
    );
  }

  // @Public()
  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 20, ttl: 60000 } })
  @Get('payments/momo')
  async payMoMO(@Req() req: Request) {
    console.log(req.query);

    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = 'pay with MoMo';
    const partnerCode = 'MOMO';
    const redirectUrl = 'http://localhost:5173/manager/appointment';
    const ipnUrl =
      'https://ad4f-119-17-239-133.ngrok-free.app/appointment/receive-notify/momo';
    const requestType = 'payWithMethod';
    const amount = Number(req.query.amount);
    const orderId =
      req.query.appointmentId + '_:_' + partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });

    try {
      console.log('Sending...');
      const response = await axios.post(
        'https://test-payment.momo.vn/v2/gateway/api/create',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return ResponseCustomizer.success(response.data);
    } catch (error) {
      console.error('Error: ', error.message);
      if (error.response) {
        console.error('Response Status: ', error.response.status);
        console.error('Response Data: ', error.response.data);
      }
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  @Public()
  @Post('receive-notify/momo')
  async receiveNotifyMoMo(@Req() req: Request) {
    console.log(req.body);
    return req.body;
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const appointmentDto = await plainToInstance(AppoinmentDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.appointmentService.update(appointmentDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.appointmentService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.appointmentService.getAll(
      Number(req.query.branchId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.appointmentService.getById(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Get('customer/:customerId')
  async getByCustomerId(@Req() req: Request) {
    const customerId = Number(req.params.customerId);
    return await this.appointmentService.getByCustomerId(customerId);
  }
}
