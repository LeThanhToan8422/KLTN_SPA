import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { PrepaidCardService } from './prepaid-card.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import PrepaidCarDto from './dtos/prepaid-card.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('prepaid-card')
export class PrepaidCardController {
  constructor(private readonly prepaidCardService: PrepaidCardService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const prepaidCardDto = await plainToInstance(PrepaidCarDto, req.body);
    const errors = await validate(prepaidCardDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.prepaidCardService.create(prepaidCardDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const prepaidCardDto = await plainToInstance(PrepaidCarDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(prepaidCardDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.prepaidCardService.update(prepaidCardDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.prepaidCardService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.prepaidCardService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.prepaidCardService.getById(Number(req.params.id));
  }
}
