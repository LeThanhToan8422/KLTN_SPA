import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Schedule from 'src/entities/schedule.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import ScheduleDto from './dtos/schedule.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class ScheduleService {
  private crudRepository: CRUDRepository<Schedule>;
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Schedule>(scheduleRepository);
  }

  async create(scheduleDto: ScheduleDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(scheduleDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ScheduleDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(scheduleDto: ScheduleDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(scheduleDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ScheduleDto, savedItem)),
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
        instanceToPlain(plainToInstance(ScheduleDto, removedItem)),
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
      instanceToPlain(plainToInstance(ScheduleDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ScheduleDto, response)),
    );
  }

  async getSchedulesByDate(date: string) {
    const response = await this.datasource.query(
      `
      SELECT *
      FROM schedule
      WHERE date BETWEEN 
        DATE_SUB(?, INTERVAL (DAYOFWEEK(?) - 2) DAY)
        AND 
        DATE_ADD(?, INTERVAL (8 - DAYOFWEEK(?)) DAY)
      order by date ASC, shift ASC
    `,
      [date, date, date, date],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ScheduleDto, response)),
    );
  }
}
