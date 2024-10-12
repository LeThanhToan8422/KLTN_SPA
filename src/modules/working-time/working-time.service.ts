import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import WorkingTime from 'src/entities/working-time.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import WorkingTimeDto from './dtos/working-time.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';

@Injectable()
export class WorkingTimeService {
  private crudRepository: CRUDRepository<WorkingTime>;
  constructor(
    @InjectRepository(WorkingTime)
    private readonly workingTimeRepository: Repository<WorkingTime>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<WorkingTime>(
      workingTimeRepository,
    );
  }

  async create(workingTimeDto: WorkingTimeDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(workingTimeDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(WorkingTimeDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(workingTimeDto: WorkingTimeDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(workingTimeDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(WorkingTimeDto, savedItem)),
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
        instanceToPlain(plainToInstance(WorkingTimeDto, removedItem)),
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
      instanceToPlain(plainToInstance(WorkingTimeDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(WorkingTimeDto, response)),
    );
  }

  async getWorkingTimeByServiceIdAndDate(
    bId: number,
    sId: number,
    date: string,
  ) {
    const response = await this.datasource.query(
      `select * from working_time as wt
      where wt.status = 'active' and wt.time not in (
        select DATE_FORMAT(a.dateTime, '%H:%i') as times from appointment as a
        inner join service as s on s.id = a.serviceOrTreatmentId
        where a.status = 'confirmed' and a.branchId = ? and a.serviceOrTreatmentId = ? and a.dateTime = ?
        and (
          select COUNT(*) from bed as b
          where b.id not in (
            select bd.id from appointment as ap
            inner join bed as bd on bd.id = ap.bedId
            inner join service as s on s.id = ap.serviceOrTreatmentId
            where ap.serviceOrTreatmentId = a.serviceOrTreatmentId and ap.dateTime = a.dateTime
            group by bd.id
            having SUM(s.duration) >= 60
          )
        ) <= 0
        group by times
      )`,
      [bId, sId, date],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(WorkingTimeDto, response)),
    );
  }
}
