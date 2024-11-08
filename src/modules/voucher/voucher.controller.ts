import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { VoucherService } from './voucher.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import VoucherDto from './dtos/voucher.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const voucherDto = await plainToInstance(VoucherDto, req.body);
    const errors = await validate(voucherDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.voucherService.create(voucherDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const voucherDto = await plainToInstance(VoucherDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(voucherDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.voucherService.update(voucherDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.voucherService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.voucherService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.voucherService.getById(Number(req.params.id));
  }
}
