import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppointmentDetail from 'src/entities/appointment-detail.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import AppoinmentDetailDto from './dtos/appointment-detail.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class AppointmentDetailService {
  private crudRepository: CRUDRepository<AppointmentDetail>;
  constructor(
    @InjectRepository(AppointmentDetail)
    private readonly appointmentDetailRepository: Repository<AppointmentDetail>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<AppointmentDetail>(
      appointmentDetailRepository,
    );
  }

  async create(appointmenDetailtDto: AppoinmentDetailDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem =
        await this.crudRepository.create(appointmenDetailtDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AppoinmentDetailDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(appointmenDetailtDto: AppoinmentDetailDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(appointmenDetailtDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AppoinmentDetailDto, savedItem)),
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
        instanceToPlain(plainToInstance(AppoinmentDetailDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async getAll(appointmentId: number, page: number, limit: number) {
    const [data, totalItems] =
      await this.appointmentDetailRepository.findAndCount({
        where: {
          appointmentId: appointmentId,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDetailDto, data)),
      new Pagination(totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDetailDto, response)),
    );
  }
}
