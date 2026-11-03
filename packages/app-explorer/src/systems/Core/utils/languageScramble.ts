import type { i18n as I18n } from 'i18next';

// On a language switch, every visible string that React rewrites decodes from
// the old language into the new one, character by character, left to right.
//
// The effect only rewrites the data of Text nodes React already owns, and its
// last write is React's own string, so React never sees a difference.

const DURATION = 560; // ms until the last character lands
const SPREAD = 0.45; // share of DURATION over which characters start, left to right
const SETTLE = 300; // ms without a React change before watching stops (once no run is active)
const GIVE_UP = 10_000; // ms to wait for languageChanged after languageChanging
const MAX_NODES = 250;
const MAX_LENGTH = 150;
const NOISE = Array.from('·-_/\\|+*#');
// Polled numbers, hashes and addresses change on their own. They are not copy.
const DYNAMIC = /\d|0x[0-9a-f]{4,}/i;
const SKIP = 'input, textarea, script, style, [contenteditable], [aria-live]';

type Run = {
  node: Text;
  from: string[];
  to: string[];
  pool: string[];
  glyphs: string[];
  begins: number[];
  lands: number[];
  start: number;
  /** What this effect last wrote. A different value means React wrote since. */
  written: string;
};

const runs = new Map<Text, Run>();
let observer: MutationObserver | undefined;
let raf = 0;
let changingAt = 0;
let changedAt = 0;
let lastChangeAt = 0;

function reducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function visible(node: Text) {
  const range = document.createRange();
  range.selectNodeContents(node);
  const rect = range.getBoundingClientRect();
  return (
    rect.height > 0 &&
    rect.bottom > 0 &&
    rect.top < window.innerHeight &&
    rect.right > 0 &&
    rect.left < window.innerWidth
  );
}

function pick(pool: string[]) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function frame(run: Run, now: number) {
  const elapsed = now - run.start;
  let text = '';
  for (let i = 0; i < run.begins.length; i++) {
    const to = run.to[i] ?? '';
    if (elapsed >= run.lands[i]) {
      text += to;
    } else if (elapsed >= run.begins[i]) {
      // Spaces land at once so the word shapes stay readable.
      if (to.trim() === '') {
        text += to;
        continue;
      }
      if (!run.glyphs[i] || Math.random() < 0.35)
        run.glyphs[i] = pick(run.pool);
      text += run.glyphs[i];
    } else {
      text += run.from[i] ?? '';
    }
  }
  return text;
}

function start(node: Text, from: string, now: number) {
  const to = node.data;
  if (
    from === to ||
    to.length > MAX_LENGTH ||
    DYNAMIC.test(to) ||
    runs.size >= MAX_NODES ||
    node.parentElement?.closest(SKIP) ||
    !visible(node)
  ) {
    runs.delete(node);
    return;
  }

  const fromChars = Array.from(from);
  const toChars = Array.from(to);
  const length = Math.max(fromChars.length, toChars.length);
  // Glyphs come from both strings, so the noise is in the scripts on screen.
  const pool = Array.from(
    new Set([...fromChars, ...toChars].filter((char) => char.trim() !== '')),
  );
  const begins: number[] = [];
  const lands: number[] = [];
  for (let i = 0; i < length; i++) {
    const begin =
      (i / Math.max(length - 1, 1)) * DURATION * SPREAD + Math.random() * 60;
    begins.push(begin);
    lands.push(
      Math.min(
        begin + 120 + Math.random() * 160,
        DURATION - Math.random() * 40,
      ),
    );
  }

  runs.set(node, {
    node,
    from: fromChars,
    to: toChars,
    pool: pool.length >= 6 ? pool : [...pool, ...NOISE],
    glyphs: [],
    begins,
    lands,
    start: now,
    written: to,
  });
}

// Records that reach here are React's writes: the effect discards its own.
// A string React changes again mid-run restarts from what is on screen.
function startAll(records: MutationRecord[], now: number) {
  if (records.length === 0) return;
  lastChangeAt = now;
  const oldValues = new Map<Text, string>();
  for (const record of records) {
    const node = record.target as Text;
    if (!oldValues.has(node)) oldValues.set(node, record.oldValue ?? '');
  }
  for (const [node, from] of oldValues) start(node, from, now);
}

// Runs as a microtask after React commits and before the browser paints, so
// the new string is never shown before the first frame replaces it.
function onReactChanges(records: MutationRecord[]) {
  const now = performance.now();
  startAll(records, now);
  write(now);
  schedule();
}

function write(now: number) {
  for (const run of runs.values()) {
    if (!run.node.isConnected) {
      runs.delete(run.node);
      continue;
    }
    // React wrote after the last frame and the observer has not delivered it
    // yet. Its text is newer than the frame, so the run ends.
    if (run.node.data !== run.written) {
      runs.delete(run.node);
      continue;
    }
    const done = now - run.start >= DURATION;
    run.written = done ? run.to.join('') : frame(run, now);
    run.node.data = run.written;
    if (done) runs.delete(run.node);
  }
  observer?.takeRecords();
}

function watching(now: number) {
  if (!observer) return false;
  // Runs last longer than SETTLE, and React can write while one is active.
  if (runs.size > 0) return true;
  if (!changedAt) return now - changingAt < GIVE_UP;
  return now - Math.max(changedAt, lastChangeAt) < SETTLE;
}

function tick() {
  raf = 0;
  const now = performance.now();
  if (observer) startAll(observer.takeRecords(), now);
  write(now);
  if (!watching(now)) {
    observer?.disconnect();
    observer = undefined;
  }
  schedule();
}

function schedule() {
  if (!raf && (observer || runs.size > 0)) raf = requestAnimationFrame(tick);
}

function finishAll() {
  for (const run of runs.values()) {
    if (run.node.isConnected) run.node.data = run.to.join('');
  }
  runs.clear();
  observer?.takeRecords();
}

export function installLanguageScramble(i18n: I18n) {
  // Vite reruns i18n.ts on hot reload; the i18next instance is the same.
  const flag = globalThis as { __fuelLanguageScramble?: boolean };
  if (flag.__fuelLanguageScramble) return;
  flag.__fuelLanguageScramble = true;

  i18n.on('languageChanging', () => {
    finishAll();
    if (reducedMotion()) return;
    changingAt = performance.now();
    changedAt = 0;
    lastChangeAt = 0;
    if (!observer) {
      observer = new MutationObserver(onReactChanges);
      observer.observe(document.body, {
        subtree: true,
        characterData: true,
        characterDataOldValue: true,
      });
    }
    schedule();
  });

  i18n.on('languageChanged', () => {
    if (observer) changedAt = performance.now();
  });
}
