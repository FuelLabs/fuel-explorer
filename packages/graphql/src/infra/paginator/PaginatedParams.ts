export default class PaginatedParams {
  cursor: any;
  direction: string;

  constructor(params: any) {
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
  }
}
