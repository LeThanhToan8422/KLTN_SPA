import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { RoomService } from './room.service';
import { Public } from 'src/decorators/public.decorator';
import { Request } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import RoomDto from './dtos/room.dto';
import { Throttle } from '@nestjs/throttler';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const roomDto = await plainToInstance(RoomDto, req.body);
    const errors = await validate(roomDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.roomService.create(roomDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const roomDto = await plainToInstance(RoomDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(roomDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.roomService.update(roomDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.roomService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.roomService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.roomService.getById(Number(req.params.id));
  }
}
