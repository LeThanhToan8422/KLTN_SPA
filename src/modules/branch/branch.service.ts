import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Branch from 'src/entities/branch.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import BranchDto from './dtos/branch.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class BranchService {
  private crudRepository: CRUDRepository<Branch>;
  constructor(
    @InjectRepository(Branch)
    private readonly branchRepository: Repository<Branch>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Branch>(branchRepository);
  }

  async create(branchDto: BranchDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(branchDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(BranchDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(branchDto: BranchDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(branchDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(BranchDto, savedItem)),
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
        instanceToPlain(plainToInstance(BranchDto, removedItem)),
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
      instanceToPlain(plainToInstance(BranchDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(BranchDto, response)),
    );
  }
}
