import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import AppointmentDetail from 'src/entities/appointment-detail.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import AppoinmentDetailDto from './dtos/appointment-detail.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import AppointmentDetailDto from './dtos/appointment-detail.dto';
import { StatusAppoiment } from 'src/enums/status-appointment.enum';

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
    } finally {
      // Đảm bảo giải phóng kết nối
      await queryRunner.release();
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
        instanceToPlain(plainToInstance(AppoinmentDetailDto, removedItem)),
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

  async getAll(appointmentId: number) {
    const response = await this.appointmentDetailRepository.find({
      where: {
        appointmentId: appointmentId,
      },
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDetailDto, response)),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDetailDto, response)),
    );
  }

  async updateStatus(id: number, status: StatusAppoiment) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const appointmentDetail = await this.crudRepository.getById(id);
      if (!appointmentDetail) {
        return ErrorCustomizer.NotFoundError(
          `AppointmentDetail with id ${id} not found.`,
        );
      }
      appointmentDetail.status = status;
      const updatedItem = await this.crudRepository.update(appointmentDetail);
      await queryRunner.commitTransaction();

      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AppointmentDetailDto, updatedItem)),
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

  async updateStatusByAppointmentId(
    appointmentId: number,
    status: StatusAppoiment,
  ) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      let appointmentDetails = await this.appointmentDetailRepository.find({
        where: {
          appointmentId: appointmentId,
        },
      });
      if (!appointmentDetails) {
        return ErrorCustomizer.NotFoundError(
          `AppointmentDetails with appointmentId ${appointmentId} not found.`,
        );
      }
      appointmentDetails = appointmentDetails?.map((a) => {
        return {
          ...a,
          status: status,
        };
      });
      const updateItems =
        await this.appointmentDetailRepository.save(appointmentDetails);
      await queryRunner.commitTransaction();

      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AppointmentDetailDto, updateItems)),
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

  async getStatisticAppointmentDetailByServiceId(
    serviceId: number,
    branchId: number,
    month: number,
    year: number,
  ) {
    const response = await this.datasource.query(
      `
      select ad.id, CONVERT_TZ(a.dateTime, '+00:00', '+07:00') AS dateTime, ad.expense, COUNT(*) as quantities, (ad.expense * COUNT(*)) as revenue from appointment as a
      inner join appointment_detail as ad on a.id = ad.appointmentId
      where ad.foreignKeyId = ?  and a.branchId = ?
      and MONTH(a.dateTime) = ? and YEAR(a.dateTime) = ?
      and ad.category = 'services' and ad.status = 'paid'
      group by a.dateTime
      order by a.dateTime ASC
    `,
      [serviceId, branchId, month, year],
    );
    return ResponseCustomizer.success(response);
  }

  async getStatisticAppointmentDetailByEmployeeId(
    employeeId: number,
    branchId: number,
    month: number,
    year: number,
  ) {
    const response = await this.datasource.query(
      `
      SELECT SubQuery.dateTime, SUM(SubQuery.commission) as commission, 
      SubQuery.role, IF(SubQuery.commission > 0, COUNT(*), 0) as quantities,
      (
        SELECT SUM(HOUR(TIMEDIFF(sch.checkOutTime, sch.checkInTime))) 
          FROM schedule as sch 
          WHERE sch.employeeId = SubQuery.employeeId AND DAY(sch.date) = DAY(SubQuery.dateTime) 
          AND MONTH(sch.date) = MONTH(SubQuery.dateTime) AND YEAR(sch.date) = YEAR(SubQuery.dateTime)
          GROUP BY sch.date, sch.employeeId
          LIMIT 0,1
      ) as hours,
      (
        SELECT SUM(HOUR(TIMEDIFF(sch.checkOutTime, sch.checkInTime))) 
          FROM schedule as sch 
          WHERE sch.employeeId = SubQuery.employeeId AND DAY(sch.date) = DAY(SubQuery.dateTime) 
          AND MONTH(sch.date) = MONTH(SubQuery.dateTime) AND YEAR(sch.date) = YEAR(SubQuery.dateTime)
          GROUP BY sch.date, sch.employeeId
          LIMIT 0,1
      ) * w.hourlyRate as salary
      FROM (
        SELECT DISTINCT ad.id, CONVERT_TZ(a.dateTime, '+00:00', '+07:00') AS dateTime, pr.commission, 
        e.role, e.id as employeeId
        FROM appointment AS a
        INNER JOIN appointment_detail AS ad ON a.id = ad.appointmentId
        INNER JOIN service AS s ON s.id = ad.foreignKeyId
        INNER JOIN prices AS pr ON s.id = pr.foreignKeyId
        INNER JOIN employee AS e ON e.id = ad.employeeId
        WHERE ad.employeeId = ?  AND a.branchId = ?
        AND MONTH(a.dateTime) = ? AND YEAR(a.dateTime) = ?
        AND ad.category = 'services' AND ad.status = 'paid'
        AND pr.type = 'service' AND pr.status = 'active'
        UNION
        SELECT 1, CONVERT_TZ(sch.date, '+00:00', '+07:00') as dateTime, 0, e.role, e.id as employeeId
        FROM schedule as sch
        INNER JOIN employee AS e ON e.id = sch.employeeId
        WHERE sch.employeeId = ? AND e.branchId = ?
        AND MONTH(sch.date) = ? AND YEAR(sch.date) = ?
      ) AS SubQuery
      INNER JOIN wage as w on w.role = SubQuery.role
      WHERE DATE(SubQuery.dateTime) < NOW()
      GROUP BY SubQuery.dateTime;
    `,
      [employeeId, branchId, month, year, employeeId, branchId, month, year],
    );
    return ResponseCustomizer.success(response);
  }

  async getStatisticAppointmentDetailByProductId(
    productId: number,
    branchId: number,
    month: number,
    year: number,
  ) {
    const response = await this.datasource.query(
      `
      select ad.id, CONVERT_TZ(a.dateTime, '+00:00', '+07:00') AS dateTime, ad.expense, COUNT(*) as quantities, (ad.expense * COUNT(*)) as revenue from appointment as a
      inner join appointment_detail as ad on a.id = ad.appointmentId
      where ad.foreignKeyId = ?  and a.branchId = ?
      and MONTH(a.dateTime) = ? and YEAR(a.dateTime) = ?
      and ad.category = 'products' and ad.status = 'paid'
      group by a.dateTime
      order by a.dateTime ASC
    `,
      [productId, branchId, month, year],
    );
    return ResponseCustomizer.success(response);
  }
}
