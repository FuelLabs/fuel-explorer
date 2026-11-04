// Use a test fixture to set the context so tests have access to the wallet extension.
import type { BrowserContext } from '@playwright/test';
import { test as base, chromium, expect } from '@playwright/test';
import { ETH_MNEMONIC, ETH_WALLET_PASSWORD } from '../mocks';
// Static import on purpose: a dynamic import() here makes Node 22 load a second
// (ESM) copy of the module, so the instance set here is not the one tests read.
import { importMetaMaskWallet } from '../utils/importMetaMaskWallet';
import { setMetaMask } from '../utils/metamask';

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getExtensionsData } from './utils/getExtensionsData';
import { waitForExtensions } from './utils/waitForExtenssions';

const FUEL_WALLET_VERSION = '0.63.2';

async function importPlaywrightUtils() {
  return await import('@fuels/playwright-utils');
}

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  debugPort: number;
}>({
  context: async ({ context: _ }, use) => {
    // dynamically import fuel-playwright-utils
    const utils = await importPlaywrightUtils();
    const fuelPathExtension = await utils.downloadFuel(FUEL_WALLET_VERSION);
    let metamaskPath =
      process.env.SYNPRESS_METAMASK_PATH || process.env.METAMASK_PATH || '';
    if (!metamaskPath) {
      const packageRoot = path.resolve(__dirname, '../../../..');
      const baseRoots = [
        path.join(
          process.cwd(),
          'node_modules',
          '.cache',
          'synpress',
          'chrome-extension',
          'metamask',
        ),
        path.join(
          packageRoot,
          'node_modules',
          '.cache',
          'synpress',
          'chrome-extension',
          'metamask',
        ),
        path.join(
          os.homedir(),
          '.cache',
          'synpress',
          'chrome-extension',
          'metamask',
        ),
        // Synpress CLI local cache (created by `synpress examples/...`) under the e2e package
        path.join(packageRoot, '.cache-synpress'),
        // Fallback if running from repo root
        path.join(process.cwd(), 'packages', 'e2e-tests', '.cache-synpress'),
      ];
      const candidates: string[] = [];
      for (const root of baseRoots) {
        if (fs.existsSync(root)) {
          try {
            const versions = fs
              .readdirSync(root, { withFileTypes: true })
              .filter((e) => e.isDirectory())
              .map((e) => path.join(root, e.name));
            candidates.push(...versions);
          } catch {}
        }
      }
      metamaskPath =
        candidates.find((p) => fs.existsSync(path.join(p, 'manifest.json'))) ||
        '';
    }
    if (!metamaskPath) {
      throw new Error(
        'Missing MetaMask extension path. Provide SYNPRESS_METAMASK_PATH or run setup:synpress to cache MetaMask.',
      );
    }
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath},${fuelPathExtension}`,
      `--load-extension=${metamaskPath},${fuelPathExtension}`,
      '--remote-debugging-port=9222',
    ];

    if (process.env.CI) {
      browserArgs.push('--disable-gpu');
    }
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      chromiumSandbox: !process.env.CI,
      args: browserArgs,
    });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Get extensions data
    const extensions = await getExtensionsData(context);
    // Wait for Fuel Wallet to load
    await waitForExtensions(context, extensions);
    const metamaskId = (extensions as Record<string, { id: string }>).metamask
      ?.id;
    const metamaskPage = await context.newPage();
    await metamaskPage.goto(`chrome-extension://${metamaskId}/home.html`);
    await importMetaMaskWallet(metamaskPage, ETH_MNEMONIC, ETH_WALLET_PASSWORD);
    setMetaMask(context, metamaskId);
    // Set context to playwright
    await use(context);
  },
  extensionId: async ({ context }, use) => {
    // Resolve Fuel Wallet extension id explicitly
    const extensions = await (
      await import('./utils/getExtensionsData')
    ).getExtensionsData(context);
    const entries = Object.entries(extensions as Record<string, any>);
    const fuelEntry = entries.find(([name]) =>
      name.toLowerCase().includes('fuel'),
    );
    const fuelExtensionId = (fuelEntry?.[1] as any)?.id;
    await use(fuelExtensionId);
  },
});

export { expect as testExpect };
