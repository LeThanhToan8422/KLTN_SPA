import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bed from 'src/entities/bed.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import BedDto from './dtos/bed.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';
import UpdateStatusDto from 'src/dtos/update-status.dto';

@Injectable()
export class BedService {
  private crudRepository: CRUDRepository<Bed>;
  constructor(
    @InjectRepository(Bed)
    private readonly bedRepository: Repository<Bed>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Bed>(bedRepository);
  }

  async create(bedDto: BedDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(bedDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(BedDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(bedDto: BedDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(bedDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(BedDto, savedItem)),
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
        instanceToPlain(plainToInstance(BedDto, removedItem)),
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
      instanceToPlain(plainToInstance(BedDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(BedDto, response)),
    );
  }

  async getBedsByServiceAndDate(bId: number, date: string, roomId: number) {
    const response = await this.datasource.query(
      `
      select * from bed as b
      where b.id not in (
        select ad.bedId from appointment as a
        inner join appointment_detail as ad on a.id = ad.appointmentId
        where ad.status = 'confirmed' and ad.category = 'services'
        and a.branchId = ? and a.dateTime = ?
      ) and b.roomId = ?
      `,
      [bId, date, roomId],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(BedDto, response)),
    );
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    return ResponseCustomizer.success(
      await this.crudRepository.updateStatus(updateStatusDto),
    );
  }
}
