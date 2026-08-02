import { Injectable } from '@nestjs/common';

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginationResult {
  skip: number;
  take: number;
  page: number;
  limit: number;
}

@Injectable()
export class PaginationService {
  getPagination(options: PaginationOptions): PaginationResult {
    const page = options.page > 0 ? options.page : 1;
    const limit = options.limit > 0 ? Math.min(options.limit, 100) : 10;
    const take = limit;
    const skip = (page - 1) * take;

    return { page, limit: take, skip, take };
  }
}
