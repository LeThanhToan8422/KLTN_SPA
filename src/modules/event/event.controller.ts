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
import { EventService } from './event.service';
import { S3Service } from 'src/services/s3.service';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import EventDto from './dtos/event.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Request } from 'express';

@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly s3Service: S3Service,
  ) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
  ) {
    const fileUrl = await this.s3Service.uploadFile(file);
    const dataParse = JSON.parse(data);
    dataParse.image = fileUrl;
    const eventDto = await plainToInstance(EventDto, dataParse);
    const errors = await validate(eventDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.eventService.create(eventDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Put(':id')
  async update(@Req() req: Request) {
    const eventDto = await plainToInstance(EventDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(eventDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.eventService.update(eventDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.eventService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.eventService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.eventService.getById(Number(req.params.id));
  }
}
