import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { WageService } from './wage.service';
import { Public } from 'src/decorators/public.decorator';
import { plainToInstance } from 'class-transformer';
import WageDto from './dtos/wage.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('wage')
export class WageController {
  constructor(private readonly wageService: WageService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const wageDto = await plainToInstance(WageDto, req.body);
    const errors = await validate(wageDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.wageService.create(wageDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const wageDto = await plainToInstance(WageDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(wageDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.wageService.update(wageDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.wageService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.wageService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.wageService.getById(Number(req.params.id));
  }
}
