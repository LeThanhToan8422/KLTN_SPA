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
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import DetailEventDto from './dtos/detail-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/services/s3.service';
import { DetailEventService } from './detail-event.service';
import { Throttle } from '@nestjs/throttler';

@Controller('detail-event')
export class DetailEventController {
  constructor(
    private readonly detailEventService: DetailEventService,
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
    const detailEventDto = await plainToInstance(DetailEventDto, dataParse);
    const errors = await validate(detailEventDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.detailEventService.create(detailEventDto);
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
    const detailEventDto = await plainToInstance(DetailEventDto, {
      id: Number(id),
      ...dataParse,
    });
    const errors = await validate(detailEventDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.detailEventService.update(detailEventDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.detailEventService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER, Role.EMPLOYEE)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.detailEventService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER, Role.EMPLOYEE)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.detailEventService.getById(Number(req.params.id));
  }
}
