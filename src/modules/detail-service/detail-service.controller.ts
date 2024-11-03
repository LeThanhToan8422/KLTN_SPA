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
import { DetailServiceService } from './detail-service.service';
import { S3Service } from 'src/services/s3.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import DetailServiceDto from './dtos/detail-service.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';

@Controller('detail-service')
export class DetailServiceController {
  constructor(
    private readonly detailServiceService: DetailServiceService,
    private readonly s3Service: S3Service,
  ) {}

  @Roles(Role.ADMIN, Role.MANAGER)
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
    const detailServiceDto = await plainToInstance(DetailServiceDto, dataParse);
    const errors = await validate(detailServiceDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.detailServiceService.create(detailServiceDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
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
    const detailServiceDto = await plainToInstance(DetailServiceDto, {
      id: Number(id),
      ...dataParse,
    });
    const errors = await validate(detailServiceDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.detailServiceService.update(detailServiceDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.detailServiceService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.detailServiceService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.detailServiceService.getById(Number(req.params.id));
  }

  @Public()
  @Get('service/:serviceId')
  async getByServiceId(@Param('serviceId') serviceId: number) {
    return await this.detailServiceService.getByServiceId(serviceId);
  }
}
