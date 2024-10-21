import { Injectable } from '@nestjs/common';
import ICRUDGeneric, {
  PaginatedResult,
} from 'src/interfaces/crud-generic.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

interface withId {
  id: number;
}

@Injectable()
export default class CRUDRepository<T extends withId>
  implements ICRUDGeneric<T>
{
  constructor(protected repository: Repository<T>) {}

  async create(item: any): Promise<T | T[]> {
    try {
      const createdItem = await this.repository.create(item);
      const savedItem = await this.repository.save(createdItem);
      return savedItem;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(item: any): Promise<T> {
    try {
      const preloadedItem = await this.repository.preload(item);
      const savedItem = await this.repository.save(preloadedItem);
      return savedItem;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id: number): Promise<T> {
    try {
      const responseItem = await this.repository.findOne({
        where: { id } as FindOptionsWhere<T>,
      });
      const removedItem = await this.repository.remove(responseItem);
      return removedItem;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(page: number, limit: number): Promise<PaginatedResult<T>> {
    const [data, totalItems] = await this.repository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
    return {
      data,
      totalItems,
    };
  }

  async getById(id: number): Promise<T> {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
    });
  }

  async getByCondition(options: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }
}
