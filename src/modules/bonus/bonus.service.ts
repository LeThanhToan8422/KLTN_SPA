import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Bonus from 'src/entities/bonus.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import BonusDto from './dtos/bonus.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';
import { Status } from 'src/enums/status.enum';
import UpdateStatusDto from 'src/dtos/update-status.dto';

@Injectable()
export class BonusService {
  private crudRepository: CRUDRepository<Bonus>;
  constructor(
    @InjectRepository(Bonus)
    private readonly bonusRepository: Repository<Bonus>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Bonus>(bonusRepository);
  }

  async create(bonusDto: BonusDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(bonusDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(BonusDto, createdItem)),
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

  async update(bonusDto: BonusDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(bonusDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(BonusDto, savedItem)),
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
        instanceToPlain(plainToInstance(BonusDto, removedItem)),
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
      instanceToPlain(plainToInstance(BonusDto, paginatedResult.data)),
      new Pagination(paginatedResult.totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(BonusDto, response)),
    );
  }

  async getNewestBonus() {
    const response = await this.bonusRepository.findOne({
      where: {
        status: Status.ACTIVE,
      },
      order: { id: 'DESC' },
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(BonusDto, response)),
    );
  }

  async getBonusPointByCustomerId(customerId: number) {
    const response = await this.datasource.query(
      `
      SELECT 
          SUM(p.specialPrice) AS expense, 
          CONVERT(SUM((p.specialPrice / b.price) * b.point), SIGNED) AS points
      FROM 
          appointment AS a
      INNER JOIN 
          prices AS p ON p.foreignKeyId = a.serviceOrTreatmentId
      INNER JOIN 
          bonus AS b ON a.bonusId = b.id
      WHERE 
          a.category = 'services' and a.status = 'finished' and a.customerId = ?;
    `,
      [customerId],
    );
    return ResponseCustomizer.success(response[0]);
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    return ResponseCustomizer.success(
      await this.crudRepository.updateStatus(updateStatusDto),
    );
  }
}
