import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ServiceService } from './service.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import ServiceDto from './dtos/service.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { S3Service } from 'src/services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly s3Service: S3Service,
  ) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    const dataParse = JSON.parse(data);
    if (file) {
      dataParse.image = await this.s3Service.uploadFile(file);
    }
    const serviceDto = await plainToInstance(ServiceDto, dataParse);
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

  @Public()
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
    @Param('id') id: number,
  ) {
    const dataParse = JSON.parse(data);
    if (file) {
      dataParse.image = await this.s3Service.uploadFile(file);
    }
    const serviceDto = await plainToInstance(ServiceDto, {
      id: Number(id),
      ...dataParse,
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
  @Get('category/:serviceCategoryId')
  async getAllByCategory(@Req() req: Request) {
    return await this.serviceService.getAllByCategory(
      Number(req.params.serviceCategoryId),
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get('out-standings')
  async getOutStandingServices() {
    return await this.serviceService.getOutStandingServices();
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.serviceService.getAll(
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

  @Public()
  @Get('revenues/:branchId')
  async getRevenueOfServiceByDate(@Req() req: Request) {
    return await this.serviceService.getRevenueOfServiceByDate(
      Number(req.query.month),
      Number(req.query.year),
      Number(req.params.branchId),
    );
  }
}
