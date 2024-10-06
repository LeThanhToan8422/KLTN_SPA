import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CardHistory from 'src/entities/card-history.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import CardHistoryDto from './dtos/card-history.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class CardHistoryService {
  private crudRepository: CRUDRepository<CardHistory>;
  constructor(
    @InjectRepository(CardHistory)
    private readonly cardHistoryRepository: Repository<CardHistory>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<CardHistory>(
      cardHistoryRepository,
    );
  }

  async create(cardHistoryDto: CardHistoryDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(cardHistoryDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(CardHistoryDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(cardHistoryDto: CardHistoryDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(cardHistoryDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(CardHistoryDto, savedItem)),
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
        instanceToPlain(plainToInstance(CardHistoryDto, removedItem)),
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
      instanceToPlain(plainToInstance(CardHistoryDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(CardHistoryDto, response)),
    );
  }
}
