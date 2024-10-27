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
import { CustomerService } from './customer.service';
import { Request } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import CustomerDto from './dtos/customer.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Public } from 'src/decorators/public.decorator';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/services/s3.service';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerService: CustomerService,
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
    const accountDto = await plainToInstance(CustomerDto, dataParse);
    const errors = await validate(accountDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.customerService.create(accountDto);
  }

  @Put(':id')
  async update(@Req() req: Request) {
    const accountDto = await plainToInstance(CustomerDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(accountDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.customerService.update(accountDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.customerService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.customerService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.customerService.getById(Number(req.params.id));
  }

  @Get('account/:id')
  async getByAccountId(@Req() req: Request) {
    return await this.customerService.getByAccountId(Number(req.params.id));
  }
}
