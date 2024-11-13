import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Employee from 'src/entities/employee.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import EmployeeDto from './dtos/employee.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';
import EmployeeSalaryDto from './dtos/employee-salary.dto';

@Injectable()
export class EmployeeService {
  private crudRepository: CRUDRepository<Employee>;
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Employee>(employeeRepository);
  }

  async create(employeeDto: EmployeeDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(employeeDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(EmployeeDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(employeeDto: EmployeeDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(employeeDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(EmployeeDto, savedItem)),
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
        instanceToPlain(plainToInstance(EmployeeDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async getAll(branchId: number, page: number, limit: number) {
    const [data, totalItems] = await this.employeeRepository.findAndCount({
      where: {
        branchId: branchId,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EmployeeDto, data)),
      new Pagination(totalItems, page, limit),
    );
  }

  async getEmployeesByDateTime(branchId: number, dateTime: string) {
    const response = await this.datasource.query(
      `
      select *
      from employee as e
      where e.status = 'active' and e.branchId = ? and e.id in (select e.id from employee as e
      inner join schedule as sch on e.id = sch.employeeId
      where DATE(sch.date) = DATE(?) and (TIME(?) BETWEEN sch.checkInTime AND sch.checkOutTime))
      order by (select COUNT(*) from appointment as a
      where a.dateTime = ? and a.employeeId = e.id) ASC  
    `,
      [branchId, dateTime, dateTime, dateTime],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EmployeeDto, response)),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EmployeeDto, response)),
    );
  }

  async getByAccountId(id: number) {
    const response = await this.employeeRepository.findOne({
      where: {
        accountId: id,
      },
    });

    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EmployeeDto, response)),
    );
  }

  async getSalaryOfEmployeeByMonthYear(
    month: number,
    year: number,
    branchId: number,
  ) {
    const response = await this.datasource.query(
      `
      select em.id, em.fullName, em.role, 
      SUM(HOUR(TIMEDIFF(sch.checkOutTime, sch.checkInTime)) * (select w.hourlyRate from employee as e
      inner join wage as w on w.role = e.role
      where NOW() <= w.effectiveDate and e.id = sch.employeeId)) as salary,
      (select SUM(p.commission) from appointment as a
      inner join prices as p on p.foreignKeyId = a.serviceOrTreatmentId
      where a.category = 'services' and p.type = 'service' and a.employeeId = em.id and YEAR(a.dateTime) = ? and MONTH(a.dateTime) = ?) as commissions
      from schedule as sch
      inner join employee as em on em.id = sch.employeeId
      where sch.checkInTime IS NOT NULL and sch.checkOutTime IS NOT NULL
      and YEAR(sch.date) = ? and MONTH(sch.date) = ? and em.branchId = ?
      group by sch.employeeId  
    `,
      [year, month, year, month, branchId],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(EmployeeSalaryDto, response)),
    );
  }
}
