import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import VoucherCategory from 'src/entities/voucher-category.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import VoucherCategoryDto from './dtos/voucher-category.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class VoucherCategoryService {
  private crudRepository: CRUDRepository<VoucherCategory>;
  constructor(
    @InjectRepository(VoucherCategory)
    private readonly appointmentRepository: Repository<VoucherCategory>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<VoucherCategory>(
      appointmentRepository,
    );
  }

  async create(voucherCategoryDto: VoucherCategoryDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(voucherCategoryDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(VoucherCategoryDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(voucherCategoryDto: VoucherCategoryDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(voucherCategoryDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(VoucherCategoryDto, savedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async delete(id: number) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const removedItem = await this.crudRepository.delete(id);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(VoucherCategoryDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async getAll(page: number, limit: number) {
    const paginatedResult = await this.crudRepository.getAll(page, limit);
    return ResponseCustomizer.success(
      instanceToPlain(
        plainToInstance(VoucherCategoryDto, paginatedResult.data),
      ),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(VoucherCategoryDto, response)),
    );
  }
}
