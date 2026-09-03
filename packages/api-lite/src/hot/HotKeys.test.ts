import { unlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { HotKeys } from './HotKeys';

describe('HotKeys', () => {
  it('buffers hits in memory until flush(), then persists them as one upsert', () => {
    const hot = new HotKeys(':memory:');
    expect(hot.hits('account', '0xaa')).toBe(0);
    hot.hit('account', '0xaa');
    hot.hit('account', '0xaa');
    hot.hit('account', '0xaa');
    // Not yet flushed: hits() only reads the persisted table.
    expect(hot.hits('account', '0xaa')).toBe(0);
    hot.flush();
    expect(hot.hits('account', '0xaa')).toBe(3);
    hot.close();
  });

  it('accumulates across multiple flushes for the same key', () => {
    const hot = new HotKeys(':memory:');
    hot.hit('tx', '0xbb');
    hot.flush();
    hot.hit('tx', '0xbb');
    hot.hit('tx', '0xbb');
    hot.flush();
    expect(hot.hits('tx', '0xbb')).toBe(3);
    hot.close();
  });

  it('keeps kinds independent', () => {
    const hot = new HotKeys(':memory:');
    hot.hit('account', '0xcc');
    hot.hit('tx', '0xcc');
    hot.hit('tx', '0xcc');
    hot.flush();
    expect(hot.hits('account', '0xcc')).toBe(1);
    expect(hot.hits('tx', '0xcc')).toBe(2);
    expect(hot.hits('block', '0xcc')).toBe(0);
    hot.close();
  });

  it('top() ranks by hits descending and caps at n', () => {
    const hot = new HotKeys(':memory:');
    hot.hit('account', '0x1');
    for (let i = 0; i < 3; i++) hot.hit('account', '0x2');
    for (let i = 0; i < 5; i++) hot.hit('account', '0x3');
    hot.flush();
    expect(hot.top('account', 2)).toEqual([
      { key: '0x3', hits: 5 },
      { key: '0x2', hits: 3 },
    ]);
    expect(hot.top('account', 10)).toHaveLength(3);
  });

  it('decay() halves all hits then deletes rows that fall below 0.5, once per injected 24h', () => {
    let now = 0;
    const hot = new HotKeys(':memory:', { now: () => now });
    for (let i = 0; i < 4; i++) hot.hit('block', '100'); // -> 4
    hot.hit('block', '200'); // -> 1
    hot.flush();
    hot.decay(); // first call ever plants the anchor; no halving yet
    expect(hot.hits('block', '100')).toBe(4);
    expect(hot.hits('block', '200')).toBe(1);
    now += 24 * 60 * 60 * 1000; // a full day since the anchor
    hot.decay(); // 4 -> 2, 1 -> 0.5
    expect(hot.hits('block', '100')).toBe(2);
    expect(hot.hits('block', '200')).toBe(0.5);
    now += 24 * 60 * 60 * 1000; // another full day
    hot.decay(); // 2 -> 1, 0.5 -> 0.25 -> pruned
    expect(hot.hits('block', '100')).toBe(1);
    expect(hot.hits('block', '200')).toBe(0);
    expect(hot.top('block', 10)).toEqual([{ key: '100', hits: 1 }]);
  });

  it('decay() is gated to once per 24h of wall time: the first call only plants the anchor, a call 24h later halves, further same-day calls no-op', () => {
    let now = 0;
    const hot = new HotKeys(':memory:', { now: () => now });
    hot.hit('account', '0x1'); // -> 1
    hot.flush();
    hot.decay(); // first call ever: sets last_decay, hits unchanged
    expect(hot.hits('account', '0x1')).toBe(1);
    now += 60 * 60 * 1000; // 1h later, still gated by the anchor
    hot.decay();
    expect(hot.hits('account', '0x1')).toBe(1);
    now += 23 * 60 * 60 * 1000; // now 24h since the anchor
    hot.decay(); // gate clears: 1 -> 0.5
    expect(hot.hits('account', '0x1')).toBe(0.5);
    now += 60 * 60 * 1000; // 1h after that decay: gated again
    hot.decay();
    expect(hot.hits('account', '0x1')).toBe(0.5);
    now += 24 * 60 * 60 * 1000; // another full day: halves again
    hot.decay(); // 0.5 -> 0.25 -> pruned
    expect(hot.hits('account', '0x1')).toBe(0);
  });

  it('decay() persists last_decay across instances so a restart does not reset the 24h cadence', () => {
    let now = 0;
    const path = join(
      tmpdir(),
      `hotkeys-decay-${Date.now()}-${Math.random()}.db`,
    );
    const first = new HotKeys(path, { now: () => now });
    first.hit('tx', '0xff'); // -> 1
    first.flush();
    first.decay(); // first call ever: plants the anchor, no halving
    first.close();

    // A fresh instance against the same file, shortly after: still gated
    // (last_decay came from the first instance, not reset by the restart).
    now += 60 * 1000;
    const second = new HotKeys(path, { now: () => now });
    second.decay();
    expect(second.hits('tx', '0xff')).toBe(1);

    // A full day after the ORIGINAL anchor (not the restart time): halves.
    now += 24 * 60 * 60 * 1000;
    second.decay();
    expect(second.hits('tx', '0xff')).toBe(0.5);
    second.close();
    unlinkSync(path);
  });

  it('counts() reports the number of distinct keys tracked per kind', () => {
    const hot = new HotKeys(':memory:');
    hot.hit('account', '0x1');
    hot.hit('account', '0x2');
    hot.hit('tx', '0x1');
    hot.flush();
    expect(hot.counts()).toEqual({ accounts: 2, txs: 1, blocks: 0 });
  });

  it('decay() never throws when the underlying sqlite write fails; it logs and leaves the gate untouched', () => {
    let now = 0;
    const hot = new HotKeys(':memory:', { now: () => now });
    hot.hit('account', '0x1');
    hot.flush();
    hot.decay(); // first call ever: plants the anchor, no write transaction yet
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    now += 24 * 60 * 60 * 1000; // a full day since the anchor: the gate clears
    // Close the connection out from under decay() without going through
    // HotKeys.close() (which would itself flush first, masking the failure).
    // main.ts wires decay() straight into an hourly setInterval with no
    // try/catch of its own -- an uncaught error here would be an unhandled
    // exception on that timer and crash the process.
    (hot as unknown as { db: { close(): void } }).db.close();
    expect(() => hot.decay()).not.toThrow();
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('flush() never throws when the underlying sqlite write fails; it logs and drops the buffer', () => {
    const hot = new HotKeys(':memory:');
    const errSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    hot.hit('account', '0xdd');
    // Close the connection out from under flush() without going through
    // HotKeys.close() (which would itself flush first, masking the failure).
    (hot as unknown as { db: { close(): void } }).db.close();
    expect(() => hot.flush()).not.toThrow();
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it('close() flushes any buffered hits before closing', () => {
    const hot = new HotKeys(':memory:');
    const flushSpy = jest.spyOn(hot, 'flush');
    hot.hit('account', '0xee');
    hot.close();
    expect(flushSpy).toHaveBeenCalled();
  });
});
