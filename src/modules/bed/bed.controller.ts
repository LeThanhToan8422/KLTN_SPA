import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { BedService } from './bed.service';
import { validate } from 'class-validator';
import BedDto from './dtos/bed.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('bed')
export class BedController {
  constructor(private readonly bedService: BedService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const bedDto = await plainToInstance(BedDto, req.body);
    const errors = await validate(bedDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.bedService.create(bedDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const bedDto = await plainToInstance(BedDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(bedDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.bedService.update(bedDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.bedService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.bedService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.bedService.getById(Number(req.params.id));
  }
}
