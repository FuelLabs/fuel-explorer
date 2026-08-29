import type { PaginationDirection } from './types';

export class PaginatedParams {
  cursor: number | null;
  direction: PaginationDirection;
  last: number;

  constructor(
    params: { after?: string; before?: string; last?: string },
    maxPageSize = 50,
  ) {
    this.cursor = null;
    this.direction = 'before';
    if (params.after) {
      this.cursor = Number(params.after);
      this.direction = 'after';
    }
    if (params.before) {
      this.cursor = Number(params.before);
      this.direction = 'before';
    }

    const last = params.last ? Number(params.last) : undefined;
    if (last !== undefined && last > maxPageSize) {
      throw new Error(`Maximum page size allowed is ${maxPageSize}`);
    }

    this.last = last || 10;
  }
}
