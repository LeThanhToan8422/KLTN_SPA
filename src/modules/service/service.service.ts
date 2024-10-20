import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Service from 'src/entities/service.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import ServiceDto from './dtos/service.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Injectable()
export class ServiceService {
  private crudRepository: CRUDRepository<Service>;
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Service>(serviceRepository);
  }

  async create(serviceDto: ServiceDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(serviceDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ServiceDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(serviceDto: ServiceDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(serviceDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ServiceDto, savedItem)),
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
        instanceToPlain(plainToInstance(ServiceDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async getAll(serviceCategoryId: number, page: number, limit: number) {
    // const paginatedResult = await this.crudRepository.getAll(page, limit);
    const paginatedResult = await this.datasource.query(
      `
      select s.id, s.name, s.duration, s.image, s.serviceCategoryId, p.originalPrice, p.price, p.specialPrice, p.commission from service as s
      inner join prices as p on s.id = p.foreignKeyId
      where s.status = 'active' and p.type = 'service' and p.applicableDate <= current_date() and s.serviceCategoryId = ?
      limit ?, ? 
    `,
      [serviceCategoryId, (page - 1) * limit, limit],
    );
    console.log(paginatedResult);

    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ServiceDto, paginatedResult)),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ServiceDto, response)),
    );
  }

  async getByServiceCategoryId(serviceCategoryId: number) {
    try {
      const services = await this.serviceRepository.find({
        where: { serviceCategoryId },
      });
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ServiceDto, services)),
      );
    } catch (error) {
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }
}
