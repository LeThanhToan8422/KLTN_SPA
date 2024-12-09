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
import MyGateWay from './gateway';
import { InjectRepository } from '@nestjs/typeorm';
import CustomerPoint from 'src/entities/customer-point.entity';
import { Repository } from 'typeorm';
import Bonus from 'src/entities/bonus.entity';
import CustomerPointDto from '../customer-point/dtos/customer-point.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private readonly appointmentService: AppointmentService,
    private readonly myGateWay: MyGateWay,
    @InjectRepository(CustomerPoint)
    private readonly customerPointRepository: Repository<CustomerPoint>,
    @InjectRepository(Bonus)
    private readonly bonusRepository: Repository<Bonus>,
  ) {}

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
      dateTime,
      customerId,
      branchId,
      bonusId,
    } = req.body;

    const [date, time] = dateTime.split(' ');
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
      time,
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
    const appointmentDto = await plainToInstance(AppoinmentDto, {
      dateTime: date,
      customerId,
      branchId,
      bonusId,
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
    const accessKey = 'F8BBA842ECF85';
    const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const orderInfo = 'pay with MoMo';
    const partnerCode = 'MOMO';
    const redirectUrl = '';
    const ipnUrl =
      'https://009a-2402-800-6371-fea6-159d-856c-2727-dfe7.ngrok-free.app/appointment/receive-notify/momo';
    const requestType = 'payWithMethod';
    const amount = Number(req.query.amount);
    const orderId =
      req.query.appointmentId +
      '_:_' +
      (req.query.appointmentDetails
        ? (req.query.appointmentDetails as []).join('_')
        : '') +
      '_:_' +
      (req.query.voucherId ? (req.query.voucherId as []).join('_') : '') +
      '_:_' +
      req.query.customerId +
      '_:_' +
      req.query.amount +
      '_:_' +
      req.query.bonusId +
      '_:_' +
      partnerCode +
      new Date().getTime();
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
    const information = req.body.orderId.split('_:_');
    const appointmentId = Number(information[0]);
    const appointmentDetails = information[1].split('_');
    const voucherId = information[2].split('_');
    const response = await this.appointmentService.updateStatusAfterPayment(
      appointmentId,
      appointmentDetails,
      voucherId,
    );
    if (response.data) {
      const foundCustomerPoint = await this.customerPointRepository.findOne({
        where: {
          customerId: Number(information[3]),
        },
      });
      const foundBonus = await this.bonusRepository.findOne({
        where: {
          id: Number(information[5]),
        },
      });
      const point = Math.ceil(
        Number(
          (Number(information[4]) / Number(foundBonus?.price)) *
            Number(foundBonus?.point),
        ),
      );
      if (foundCustomerPoint) {
        foundCustomerPoint.expenditures += Number(information[4]);
        foundCustomerPoint.accumulationPoints += point;
        foundCustomerPoint.currentPoints += point;
        await this.customerPointRepository.save(foundCustomerPoint);
      } else {
        const customerPoint = plainToInstance(CustomerPointDto, {
          expenditures: Number(information[4]),
          accumulationPoints: point,
          currentPoints: point,
          customerId: Number(information[3]),
        });
        await this.customerPointRepository.save(customerPoint);
      }
    }
    this.myGateWay.sendNotifyPayment(response);
    return response;
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

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Put(':id/status')
  async updateStatus(@Req() req: Request) {
    const { status } = req.body;
    if (!['paid', 'unpaid', 'canceled'].includes(status)) {
      return ErrorCustomizer.BadRequestError(
        `Invalid status value: ${status}. Allowed values are 'paid', 'unpaid', 'canceled'.`,
      );
    }
    return await this.appointmentService.updateStatus(
      Number(req.params.id),
      status,
    );
  }

  @Get('details/account/:accountId')
  async getAppointmentByAccountId(@Req() req: Request) {
    return await this.appointmentService.getAppointmentByAccountId(
      Number(req.params.accountId),
    );
  }
}
