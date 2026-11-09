import { spawnSync } from 'node:child_process';

const runChild = (body: string) =>
  spawnSync(
    process.execPath,
    [
      '--require',
      require.resolve('tsx/cjs'),
      '-e',
      `const { startWatchdog } = require(${JSON.stringify(require.resolve('./watchdog'))});\n${body}`,
    ],
    { encoding: 'utf8', timeout: 20_000 },
  );

describe('startWatchdog', () => {
  it('kills the process when the event loop stays blocked past stallMs', () => {
    const child = runChild(`
      startWatchdog({ stallMs: 500, checkMs: 100 });
      setTimeout(() => {
        const until = Date.now() + 10_000;
        while (Date.now() < until) {}
        process.exit(0);
      }, 300);
    `);
    expect(child.signal).toBe('SIGKILL');
    expect(child.stderr).toMatch(/watchdog: event loop blocked for \d+ms/);
  });

  it('leaves a responsive process alone and does not keep it alive', () => {
    const child = runChild(`
      startWatchdog({ stallMs: 500, checkMs: 100 });
      setTimeout(() => {}, 1_500);
    `);
    expect(child.signal).toBeNull();
    expect(child.status).toBe(0);
    expect(child.stderr).not.toMatch(/watchdog/);
  });
});
