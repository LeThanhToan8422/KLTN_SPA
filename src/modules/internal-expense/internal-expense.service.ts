import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import InternalExpense from 'src/entities/internal-expense.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import InternalExpenseDto from './dtos/internal-expense.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class InternalExpenseService {
  private crudRepository: CRUDRepository<InternalExpense>;
  constructor(
    @InjectRepository(InternalExpense)
    private readonly internalExpenseRepository: Repository<InternalExpense>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<InternalExpense>(
      internalExpenseRepository,
    );
  }

  async create(internalExpenseDto: InternalExpenseDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(internalExpenseDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(InternalExpenseDto, createdItem)),
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

  async update(internalExpenseDto: InternalExpenseDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(internalExpenseDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(InternalExpenseDto, savedItem)),
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
        instanceToPlain(plainToInstance(InternalExpenseDto, removedItem)),
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
      instanceToPlain(
        plainToInstance(InternalExpenseDto, paginatedResult.data),
      ),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getExpenseByMonthYear(month: number, year: number, branchId: number) {
    const response = await this.datasource.query(
      `
      select * from internal_expense as ie
      where YEAR(ie.date) = ? and MONTH(ie.date) = ? and ie.branchId = ?
    `,
      [year, month, branchId],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(InternalExpenseDto, response)),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(InternalExpenseDto, response)),
    );
  }
}
