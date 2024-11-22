import { BonusService } from './bonus.service';
import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request } from 'express';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import BonusDto from './dtos/bonus.dto';
import { Public } from 'src/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import UpdateStatusDto from 'src/dtos/update-status.dto';

@Controller('bonus')
export class BonusController {
  constructor(private readonly bonusService: BonusService) {}

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post()
  async create(@Req() req: Request) {
    const bonusDto = await plainToInstance(BonusDto, req.body);
    const errors = await validate(bonusDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.bonusService.create(bonusDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('update-status')
  async updateStatus(@Req() req: Request) {
    const updateStatusDto = await plainToInstance(UpdateStatusDto, {
      id: req.query.id,
      status: req.query.status,
    });
    return await this.bonusService.updateStatus(updateStatusDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 15, ttl: 60000 } })
  @Put(':id')
  async update(@Req() req: Request) {
    const bonusDto = await plainToInstance(BonusDto, {
      id: Number(req.params.id),
      ...req.body,
    });
    const errors = await validate(bonusDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.bonusService.update(bonusDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.bonusService.delete(Number(req.params.id));
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get()
  async getAll(@Req() req: Request) {
    return await this.bonusService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.bonusService.getById(Number(req.params.id));
  }

  @Public()
  @Get('newest/active')
  async getNewestBonus() {
    return await this.bonusService.getNewestBonus();
  }

  @Public()
  @Get('customer/:id')
  async getBonusPointByCustomerId(@Req() req: Request) {
    return await this.bonusService.getBonusPointByCustomerId(
      Number(req.params.id),
    );
  }
}
