import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Events from 'src/entities/event.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import EventDto from './dtos/event.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Injectable()
export class EventService {
  private crudRepository: CRUDRepository<Events>;
  constructor(
    @InjectRepository(Events)
    private readonly eventRepository: Repository<Events>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Events>(eventRepository);
  }

  async create(eventDto: EventDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(eventDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(EventDto, createdItem)),
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

  async update(eventDto: EventDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(eventDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(EventDto, savedItem)),
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
        instanceToPlain(plainToInstance(EventDto, removedItem)),
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

  async getAll() {
    const response = await this.datasource.query(`
      select * from events as e
      where e.startDate <= NOW() and e.expiryDate >= NOW()
    `);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EventDto, response)),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EventDto, response)),
    );
  }
}
