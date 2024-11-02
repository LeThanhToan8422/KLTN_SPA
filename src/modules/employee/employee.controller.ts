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
import { Request } from 'express';
import { EmployeeService } from './employee.service';
import { plainToInstance } from 'class-transformer';
import EmployeeDto from './dtos/employee.dto';
import { validate } from 'class-validator';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import UserDto from 'src/dtos/user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from 'src/services/s3.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
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
    const employeeDto = await plainToInstance(EmployeeDto, dataParse);
    const errors = await validate(employeeDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.employeeService.create(employeeDto);
  }

  @Public()
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @UploadedFile() file: Express.Multer.File,
    @Body('data') data: string,
    @Param('id') id: number,
  ) {
    console.log(id);
    console.log(file);
    console.log(data);

    const dataParse = JSON.parse(data);
    if (file) {
      dataParse.image = await this.s3Service.uploadFile(file);
    }
    const employeeDto = await plainToInstance(EmployeeDto, {
      id: Number(id),
      ...dataParse,
    });
    const errors = await validate(employeeDto);
    if (errors.length > 0) {
      const messageErrors = errors.map((e) => {
        return {
          property: e.property,
          constraints: e.constraints,
        };
      });
      return ErrorCustomizer.BadRequestError(JSON.stringify(messageErrors[0]));
    }
    return await this.employeeService.update(employeeDto);
  }

  @Roles(Role.ADMIN, Role.MANAGER)
  @Delete(':id')
  async delete(@Req() req: Request) {
    return await this.employeeService.delete(Number(req.params.id));
  }

  @Get()
  async getAll(@Req() req: Request) {
    return await this.employeeService.getAll(
      Number(req.query.page),
      Number(req.query.limit),
    );
  }

  @Get('details')
  async getById(@Req() req: Request) {
    const userDto = await plainToInstance(UserDto, req.user);
    return await this.employeeService.getById(Number(userDto.id));
  }

  @Get('account/:id')
  async getByAccountId(@Req() req: Request) {
    return await this.employeeService.getByAccountId(Number(req.params.id));
  }

  @Get(':id')
  async getByEmpId(@Req() req: Request) {
    return await this.employeeService.getById(Number(req.params.id));
  }
}
