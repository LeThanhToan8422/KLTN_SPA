// src/common/pagination.ts
export class Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;

  constructor(totalItems: number, currentPage: number, itemsPerPage: number) {
    this.totalItems = totalItems;
    this.currentPage = currentPage;
    this.itemsPerPage = itemsPerPage;
    this.totalPages = Math.ceil(totalItems / itemsPerPage);
  }
}
