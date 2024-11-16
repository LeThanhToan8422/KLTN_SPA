import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Appointment from 'src/entities/appointment.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import AppoinmentDto from './dtos/appoiment.dto';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';
import { StatusAppoiment } from 'src/enums/status-appointment.enum';
import CustomerDto from '../customer/dtos/customer.dto';
import { CustomerService } from '../customer/customer.service';

@Injectable()
export class AppointmentService {
  private crudRepository: CRUDRepository<Appointment>;
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    private readonly customerService: CustomerService,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Appointment>(
      appointmentRepository,
    );
  }

  async create(appointmentDto: AppoinmentDto, customerDto: CustomerDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      if (customerDto) {
        const insertedCustomer = await this.customerService.create(customerDto);
        appointmentDto.customerId = plainToInstance(
          CustomerDto,
          insertedCustomer.data,
        ).id;
      }
      const createdItem = await this.crudRepository.create(appointmentDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AppoinmentDto, createdItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async update(appointmentDto: AppoinmentDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(appointmentDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(AppoinmentDto, savedItem)),
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
        instanceToPlain(plainToInstance(AppoinmentDto, removedItem)),
      );
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return ResponseCustomizer.error(
        ErrorCustomizer.InternalServerError(error.message),
      );
    }
  }

  async getAll(branchId: number, page: number, limit: number) {
    const [data, totalItems] = await this.appointmentRepository.findAndCount({
      where: {
        branchId: branchId,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDto, data)),
      new Pagination(totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDto, response)),
    );
  }

  async getByCustomerId(customerId: number) {
    const appointments = await this.crudRepository.getByCondition({
      where: { customerId },
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDto, appointments)),
    );
  }

  async updateStatus(id: number, status: string) {
    const founded = await this.appointmentRepository.findOne({
      where: { id },
    });
    if (status === 'confirmed') {
      founded.status = StatusAppoiment.CONFIRMED;
    } else if (status === 'performing') {
      founded.status = StatusAppoiment.PERFORMING;
    } else if (status === 'finished') {
      founded.status = StatusAppoiment.FINISHED;
    } else if (status === 'cancelled') {
      founded.status = StatusAppoiment.CANCELED;
    }
    const response = await this.appointmentRepository.save(founded);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(AppoinmentDto, response)),
    );
  }
}
