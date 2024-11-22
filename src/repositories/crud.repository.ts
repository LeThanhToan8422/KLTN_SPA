import { Injectable } from '@nestjs/common';
import UpdateStatusDto from 'src/dtos/update-status.dto';
import ICRUDGeneric, {
  PaginatedResult,
} from 'src/interfaces/crud-generic.interface';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

interface withId {
  id: number;
}

interface withStatus {
  status: string;
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

  async updateStatus(item: UpdateStatusDto): Promise<T & withStatus> {
    try {
      const responseItem = await this.repository.findOne({
        where: { id: item.id } as FindOptionsWhere<T>,
      });

      if (this.hasStatus(responseItem)) {
        responseItem.status = item.status;
        const savedItem = await this.repository.save(responseItem);
        return savedItem;
      } else {
        throw new Error('This entity does not have a "status" field');
      }
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

  private hasStatus(item: any): item is T & withStatus {
    return 'status' in item;
  }
}
