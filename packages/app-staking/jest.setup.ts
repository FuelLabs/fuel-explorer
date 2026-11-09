import { TextDecoder, TextEncoder } from 'node:util';

// jsdom lacks these, and viem reads them at import time.
Object.assign(globalThis, { TextDecoder, TextEncoder });
