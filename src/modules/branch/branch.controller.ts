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

@Controller('branch')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
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
  @Put(':id')
  async update(@Req() req: Request) {
    const branchDto = await plainToInstance(BranchDto, {
      id: Number(req.params.id),
      ...req.body,
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
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.branchService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.branchService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get(':id')
  async getById(@Req() req: Request) {
    return await this.branchService.getById(Number(req.params.id));
  }
}
