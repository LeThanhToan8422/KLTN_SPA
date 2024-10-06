import { Controller, Delete, Get, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';
import { Public } from 'src/decorators/public.decorator';
import { BranchService } from './branch.service';
import { validate } from 'class-validator';
import BranchDto from './dtos/branch.dto';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Controller('branch')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Public()
  @Post()
  async create(@Req() req: Request) {
    const branchDto = await plainToInstance(BranchDto, req.body);
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
