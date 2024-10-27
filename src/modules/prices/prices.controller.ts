import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { PricesService } from './prices.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import PricesDto from './dtos/prices.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const pricesDto = await plainToInstance(PricesDto, req.body);
    const errors = await validate(pricesDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.pricesService.create(pricesDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const pricesDto = await plainToInstance(PricesDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(pricesDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.pricesService.update(pricesDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.pricesService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.pricesService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.pricesService.getById(Number(req.params.id));
  }

  @Public()
  @Get('foreign-key/:foreignKeyId')
  async getByForeignKeyId(@Req() req: Request) {
    const foreignKeyId = Number(req.params.foreignKeyId);
    return await this.pricesService.getByForeignKeyId(foreignKeyId);
  }
}
