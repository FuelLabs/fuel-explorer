export default class PaginatedParams {
  cursor: any;
  direction: string;
  last: number;

  constructor(params: any, maxPageSize = 50) {
    this.cursor = null;
    this.direction = 'before';
    if (params.after) {
      this.cursor = params.after;
      this.direction = 'after';
    }
    if (params.before) {
      this.cursor = params.before;
      this.direction = 'before';
    }

    if (params.last > maxPageSize) {
      throw new Error(`Maximum page size allowed is ${maxPageSize}`);
    }

    this.last = params.last || 10;
  }
}
