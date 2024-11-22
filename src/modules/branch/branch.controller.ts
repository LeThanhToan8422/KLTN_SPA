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
import { Request } from 'express';
import { BranchService } from './branch.service';
import { validate } from 'class-validator';
import BranchDto from './dtos/branch.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { S3Service } from 'src/services/s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators/public.decorator';
import { Throttle } from '@nestjs/throttler';
import UpdateStatusDto from 'src/dtos/update-status.dto';

@Controller('branch')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
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
    const branchDto = await plainToInstance(BranchDto, dataParse);
    const errors = await validate(branchDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.branchService.create(branchDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('update-status')
  async updateStatus(@Req() req: Request) {
    const updateStatusDto = await plainToInstance(UpdateStatusDto, {
      id: req.query.id,
      status: req.query.status,
    });
    return await this.branchService.updateStatus(updateStatusDto);
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
    const branchDto = await plainToInstance(BranchDto, {
      id: Number(id),
      ...dataParse,
    });
    const errors = await validate(branchDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.branchService.update(branchDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.branchService.delete(Number(req.params.id));
  }

  @Public()
  @Get()
  async getAll(@Req() req: Request) {
    return await this.branchService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Public()
  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.branchService.getById(Number(req.params.id));
  }
}
