import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import ServiceCategoryDto from './dtos/service-category.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('service-category')
export class ServiceCategoryController {
  constructor(
    private readonly serviceCategoryService: ServiceCategoryService,
  ) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const serviceCategoryDto = await plainToInstance(
      ServiceCategoryDto,
      req.body,
    );
    const errors = await validate(serviceCategoryDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.serviceCategoryService.create(serviceCategoryDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const serviceCategoryDto = await plainToInstance(ServiceCategoryDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(serviceCategoryDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.serviceCategoryService.update(serviceCategoryDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.serviceCategoryService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.serviceCategoryService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.serviceCategoryService.getById(Number(req.params.id));
  }
}
