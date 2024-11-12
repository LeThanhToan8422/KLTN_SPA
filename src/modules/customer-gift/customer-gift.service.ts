import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CustomerGift from 'src/entities/customer-gift.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import CustomerGiftDto from './dtos/customer-gift.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class CustomerGiftService {
  private crudRepository: CRUDRepository<CustomerGift>;
  constructor(
    @InjectRepository(CustomerGift)
    private readonly customerGiftRepository: Repository<CustomerGift>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<CustomerGift>(
      customerGiftRepository,
    );
  }

  async create(customerGiftDto: CustomerGiftDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(customerGiftDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(CustomerGiftDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(customerGiftDto: CustomerGiftDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(customerGiftDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(CustomerGiftDto, savedItem)),
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
        instanceToPlain(plainToInstance(CustomerGiftDto, removedItem)),
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
      instanceToPlain(plainToInstance(CustomerGiftDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(CustomerGiftDto, response)),
    );
  }

  async getByCustomerId(customerId: number) {
    const customerPoints = await this.customerGiftRepository.find({
      where: { customerId },
    });

    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(CustomerGiftDto, customerPoints)),
    );
  }
}
