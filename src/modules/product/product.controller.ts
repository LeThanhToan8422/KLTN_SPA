import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ProductDto from './dtos/product.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { S3Service } from 'src/services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3Service,
  ) {}

  @Public()
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    const fileUrl = await this.s3Service.uploadFile(file);
    const dataParse = JSON.parse(data);
    dataParse.image = fileUrl;
    const appointmentDto = await plainToInstance(ProductDto, dataParse);
    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.productService.create(appointmentDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const appointmentDto = await plainToInstance(ProductDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(appointmentDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.productService.update(appointmentDto);
  }

  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.productService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.productService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.productService.getById(Number(req.params.id));
  }
}
