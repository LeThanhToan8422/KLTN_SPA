import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { VoucherCategoryService } from './voucher-category.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import VoucherCategoryDto from './dtos/voucher-category.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('voucher-category')
export class VoucherCategoryController {
  constructor(
    private readonly voucherCategoryService: VoucherCategoryService,
  ) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const voucherCategoryDto = await plainToInstance(
      VoucherCategoryDto,
      req.body,
    );
    const errors = await validate(voucherCategoryDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.voucherCategoryService.create(voucherCategoryDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const voucherCategoryDto = await plainToInstance(VoucherCategoryDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(voucherCategoryDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.voucherCategoryService.update(voucherCategoryDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.voucherCategoryService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.voucherCategoryService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.voucherCategoryService.getById(Number(req.params.id));
  }
}
