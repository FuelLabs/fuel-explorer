import { ValidationError } from '../errors';
import type { PaginationDirection } from './types';

// Cursors are row ids (see L1Index.queryStakingEvents's `_id = @cursor`
// lookup and StakingStore.getEvents's startCursor/endCursor, both bare
// integers) -- Number() on a non-numeric value would silently become NaN
// and bind into the SQL lookup as such, so reject anything that isn't an
// integer up front.
function parseCursor(value: string): number {
  const cursor = Number(value);
  if (!Number.isInteger(cursor)) {
    throw new ValidationError('Cursor must be an integer');
  }
  return cursor;
}

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
      this.cursor = parseCursor(params.after);
      this.direction = 'after';
    }
    if (params.before) {
      this.cursor = parseCursor(params.before);
      this.direction = 'before';
    }

    const last = params.last ? Number(params.last) : undefined;
    if (last !== undefined) {
      // Checked separately from the maxPageSize cap below so callers keep
      // seeing the existing "Maximum page size allowed" message for an
      // over-cap value (rest/router.test.ts asserts on it) while 0,
      // negatives and non-integers -- which used to slip through as -1 did,
      // reaching SQLite's `LIMIT @limit` as an unlimited scan -- get the new
      // message.
      if (!Number.isInteger(last) || last < 1) {
        throw new ValidationError(
          `Page size must be an integer between 1 and ${maxPageSize}`,
        );
      }
      if (last > maxPageSize) {
        throw new ValidationError(
          `Maximum page size allowed is ${maxPageSize}`,
        );
      }
    }

    this.last = last || 10;
  }
}
