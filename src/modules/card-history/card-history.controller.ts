import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { CardHistoryService } from './card-history.service';
import CardHistoryDto from './dtos/card-history.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('card-history')
export class CardHistoryController {
  constructor(private readonly cardHistoryService: CardHistoryService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const cardHistoryDto = await plainToInstance(CardHistoryDto, req.body);
    const errors = await validate(cardHistoryDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.cardHistoryService.create(cardHistoryDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const cardHistoryDto = await plainToInstance(CardHistoryDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(cardHistoryDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.cardHistoryService.update(cardHistoryDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.cardHistoryService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.cardHistoryService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.cardHistoryService.getById(Number(req.params.id));
  }
}
