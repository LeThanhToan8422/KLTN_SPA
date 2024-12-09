import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Prices from 'src/entities/prices.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import PricesDto from './dtos/prices.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';
import UpdateStatusDto from 'src/dtos/update-status.dto';

@Injectable()
export class PricesService {
  private crudRepository: CRUDRepository<Prices>;
  constructor(
    @InjectRepository(Prices)
    private readonly pricesRepository: Repository<Prices>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Prices>(pricesRepository);
  }

  async create(pricesDto: PricesDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(pricesDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(PricesDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    } finally {
      // Đảm bảo giải phóng kết nối
      await queryRunner.release();
    }
  }

  async update(pricesDto: PricesDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(pricesDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(PricesDto, savedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    } finally {
      // Đảm bảo giải phóng kết nối
      await queryRunner.release();
    }
  }

  async delete(id: number) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const removedItem = await this.crudRepository.delete(id);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(PricesDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    } finally {
      // Đảm bảo giải phóng kết nối
      await queryRunner.release();
    }
  }

  async getAll(page: number, limit: number) {
    const paginatedResult = await this.crudRepository.getAll(page, limit);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(PricesDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(PricesDto, response)),
    );
  }

  async getByForeignKeyId(foreignKeyId: number) {
    const prices = await this.crudRepository.getByCondition({
      where: { foreignKeyId },
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(PricesDto, prices)),
    );
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    return ResponseCustomizer.success(
      await this.crudRepository.updateStatus(updateStatusDto),
    );
  }
}
