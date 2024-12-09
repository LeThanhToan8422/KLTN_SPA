import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Otp from 'src/entities/otp.entity';
import { DataSource, Repository } from 'typeorm';
import OtpDto from './dtos/otp.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';

@Injectable()
export class OtpService {
  constructor(
    @InjectRepository(Otp)
    private readonly otpRepository: Repository<Otp>,
    private datasource: DataSource,
  ) {}

  async sendOtp(otpDto: OtpDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      let foundPhone = await this.otpRepository.findOne({
        where: {
          phone: otpDto.phone,
        },
      });
      if (foundPhone) {
        foundPhone.otp = otpDto.otp;
      } else {
        foundPhone = otpDto;
      }
      const response = await this.otpRepository.save(foundPhone);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(OtpDto, response)),
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

  async create(otpDto: OtpDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.otpRepository.save(otpDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(OtpDto, createdItem)),
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

  async update(otpDto: OtpDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.otpRepository.save(otpDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(OtpDto, savedItem)),
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

  async delete(phone: string) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const foundItem = await this.otpRepository.findOne({
        where: {
          phone: phone,
        },
      });
      const removedItem = await this.otpRepository.remove(foundItem);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(OtpDto, removedItem)),
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

  async getByPhone(phone: string) {
    const response = await this.otpRepository.findOne({
      where: {
        phone: phone,
      },
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(OtpDto, response)),
    );
  }
}
