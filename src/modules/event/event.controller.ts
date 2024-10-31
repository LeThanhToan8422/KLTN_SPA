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
import { Public } from 'src/decorators/public.decorator';

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
    const dataParse = JSON.parse(data);
    if (file) {
      dataParse.image = await this.s3Service.uploadFile(file);
    }
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
    const eventDto = await plainToInstance(EventDto, {
      id: Number(id),
      ...dataParse,
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

  @Public()
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
