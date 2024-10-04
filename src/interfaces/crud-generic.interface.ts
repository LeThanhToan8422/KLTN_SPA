import { DeepPartial } from 'typeorm';

export interface PaginatedResult<T> {
  data: T[];
  totalItems: number;
}

export default interface ICRUDGeneric<T> {
  create(item: DeepPartial<T>): Promise<T | T[]>;
  update(id: number, item: DeepPartial<T>): Promise<T>;
  delete(id: number): Promise<T>;
  getAll(page: number, limit: number): Promise<PaginatedResult<T>>;
  getById(id: number): Promise<T | null>;
}
