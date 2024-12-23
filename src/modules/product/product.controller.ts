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
import { ProductService } from './product.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import ProductDto from './dtos/product.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { S3Service } from 'src/services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import UpdateStatusDto from 'src/dtos/update-status.dto';
import { Status } from 'src/enums/status.enum';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly s3Service: S3Service,
  ) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
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
    const productDto = await plainToInstance(ProductDto, dataParse);
    const errors = await validate(productDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.productService.create(productDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('update-status')
  async updateStatus(@Req() req: Request) {
    const updateStatusDto = await plainToInstance(UpdateStatusDto, {
      id: req.query.id,
      status: req.query.status,
    });
    return await this.productService.updateStatus(updateStatusDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
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
    const productDto = await plainToInstance(ProductDto, {
      id: Number(id),
      ...dataParse,
    });
    const errors = await validate(productDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.productService.update(productDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.productService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.productService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get('status')
  async getAllByStatus(@Req() req: Request) {
    return await this.productService.getAllByStatus(
      Number(req.query.page),
      Number(req.query.limit),
      req.query.status + '' === 'active' ? Status.ACTIVE : Status.INACTIVE,
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.productService.getById(Number(req.params.id));
  }

  @Public()
  @Get('all/with-prices')
  async getAllWithPrices() {
    return await this.productService.getAllWithPrices();
  }

  @Public()
  @Get('events/:eventId')
  async getProductsByEventId(@Req() req: Request) {
    return await this.productService.getProductsByEventId(
      Number(req.params.eventId),
    );
  }

  // @Roles(Role.ADMIN, Role.MANAGER)
  @Public()
  @Get('revenues/:branchId')
  async getRevenueOfServiceByDate(@Req() req: Request) {
    return await this.productService.getRevenueOfProductByDate(
      Number(req.query.month),
      Number(req.query.year),
      Number(req.params.branchId),
    );
  }
}
