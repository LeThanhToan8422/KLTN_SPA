import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ServiceService } from './service.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import ServiceDto from './dtos/service.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('service')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const serviceDto = await plainToInstance(ServiceDto, req.body);
    const errors = await validate(serviceDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.serviceService.create(serviceDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const serviceDto = await plainToInstance(ServiceDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(serviceDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.serviceService.update(serviceDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.serviceService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.serviceService.getAll(
      Number(req.query.serviceCategoryId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get('discount')
  async getDiscountServices(@Req() req: Request) {
    return await this.serviceService.getDiscountServices(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.serviceService.getById(Number(req.params.id));
  }

  @Public()
  @Get('category/:serviceCategoryId')
  async getByServiceCategoryId(@Req() req: Request) {
    return await this.serviceService.getByServiceCategoryId(
      Number(req.params.serviceCategoryId),
    );
  }
}
