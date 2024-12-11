import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Product from 'src/entities/product.entity';
import CRUDRepository from 'src/repositories/crud.repository';
import { DataSource, Repository } from 'typeorm';
import ProductDto from './dtos/product.dto';
import { ResponseCustomizer } from 'src/helpers/response-customizer.response';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import ErrorCustomizer from 'src/helpers/error-customizer.error';
import { Pagination } from 'src/helpers/pagination';
import UpdateStatusDto from 'src/dtos/update-status.dto';
import { Status } from 'src/enums/status.enum';

@Injectable()
export class ProductService {
  private crudRepository: CRUDRepository<Product>;
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private datasource: DataSource,
  ) {
    this.crudRepository = new CRUDRepository<Product>(productRepository);
  }

  async create(productDto: ProductDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const createdItem = await this.crudRepository.create(productDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ProductDto, createdItem)),
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

  async update(productDto: ProductDto) {
    const queryRunner = this.datasource.createQueryRunner();
    queryRunner.startTransaction();
    try {
      const savedItem = await this.crudRepository.update(productDto);
      await queryRunner.commitTransaction();
      return ResponseCustomizer.success(
        instanceToPlain(plainToInstance(ProductDto, savedItem)),
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
        instanceToPlain(plainToInstance(ProductDto, removedItem)),
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
    const [data, totalItems] = await this.productRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ProductDto, data)),
      new Pagination(totalItems, page, limit),
    );
  }

  async getAllByStatus(
    page: number,
    limit: number,
    status: Status = Status.ACTIVE,
  ) {
    const [data, totalItems] = await this.productRepository.findAndCount({
      where: {
        status: status,
      },
      skip: (page - 1) * limit,
      take: limit,
    });
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ProductDto, data)),
      new Pagination(totalItems, page, limit),
    );
  }

  async getById(id: number) {
    const response = await this.crudRepository.getById(id);
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ProductDto, response)),
    );
  }

  async updateStatus(updateStatusDto: UpdateStatusDto) {
    return ResponseCustomizer.success(
      await this.crudRepository.updateStatus(updateStatusDto),
    );
  }

  async getAllWithPrices() {
    const response = await this.datasource.query(`
      select p.id, p.name, p.image, p.serviceCategoryId, pr.price, pr.specialPrice, pr.commission, floor(IF(e.discount IS NOT NULL, pr.price - (pr.price * (e.discount / 100)), pr.specialPrice)) as finalPrice
      from product as p
      inner join prices as pr on p.id = pr.foreignKeyId
      left join events as e on e.id = pr.eventId
      where pr.type = 'product' and pr.status = 'active' 
      and p.status = 'active' and pr.status = 'active'  
    `);
    return ResponseCustomizer.success(response);
  }

  async getProductsByEventId(eventId: number) {
    const response = await this.datasource.query(
      `
      select p.id, p.name, p.image, p.serviceCategoryId, pr.price, pr.specialPrice, pr.commission, floor(IF(e.discount IS NOT NULL, pr.price - (pr.price * (e.discount / 100)), pr.specialPrice)) as finalPrice
      from product as p
      inner join prices as pr on p.id = pr.foreignKeyId
      left join events as e on e.id = pr.eventId
      where pr.type = 'product' and pr.status = 'active' 
      and p.status = 'active' and pr.status = 'active' and pr.eventId = ?
    `,
      [eventId],
    );
    return ResponseCustomizer.success(response);
  }

  async getRevenueOfProductByDate(
    month: number,
    year: number,
    branchId: number,
  ) {
    const response = await this.datasource.query(
      `
      select pr.id, pr.name, COUNT(*) as quantities, (ad.expense * COUNT(*)) as revenue from appointment as a
      inner join appointment_detail as ad on a.id = ad.appointmentId
      inner join product as pr on pr.id = ad.foreignKeyId
      where YEAR(a.dateTime) = ? and MONTH(a.dateTime) = ?
      and a.branchId = ? and ad.status = 'paid' 
      and ad.category = 'products'
      group by ad.foreignKeyId
    `,
      [year, month, branchId],
    );
    return ResponseCustomizer.success(
      instanceToPlain(plainToInstance(ProductDto, response)),
    );
  }
}
