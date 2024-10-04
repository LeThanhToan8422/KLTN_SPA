// src/common/response-customizer.ts

import ErrorCustomizer from './error-customizer.error';
import { Pagination } from './pagination';

export class ResponseCustomizer {
  data: object | null;
  error: ErrorCustomizer | null;
  pagination: Pagination | null;

  constructor(
    data: object | null = null,
    error: ErrorCustomizer | null = null,
    pagination: Pagination | null = null,
  ) {
    this.data = data;
    this.error = error;
    this.pagination = pagination;
  }

  static success(data: object, pagination: Pagination | null = null) {
    return new ResponseCustomizer(data, null, pagination);
  }

  static error(error: ErrorCustomizer) {
    return new ResponseCustomizer(null, error, null);
  }
}
