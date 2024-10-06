import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { ConsumedProductService } from './consumed-product.service';
import ConsumedProductDto from './dtos/consumed-product.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('consumed-product')
export class ConsumedProductController {
  constructor(
    private readonly consumedProductService: ConsumedProductService,
  ) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const consumedProductDto = await plainToInstance(
      ConsumedProductDto,
      req.body,
    );
    const errors = await validate(consumedProductDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.consumedProductService.create(consumedProductDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const consumedProductDto = await plainToInstance(ConsumedProductDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(consumedProductDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.consumedProductService.update(consumedProductDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.consumedProductService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.consumedProductService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.consumedProductService.getById(Number(req.params.id));
  }
}
