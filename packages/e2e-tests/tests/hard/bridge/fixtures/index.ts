// Use a test fixture to set the context so tests have access to the wallet extension.
import type { BrowserContext } from '@playwright/test';
import { test as base, chromium, expect } from '@playwright/test';
import { ETH_MNEMONIC, ETH_WALLET_PASSWORD } from '../mocks';

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { getExtensionsData } from './utils/getExtensionsData';
import { waitForExtensions } from './utils/waitForExtenssions';

const FUEL_WALLET_VERSION = '0.57.1';

async function importPlaywrightUtils() {
  return await import('@fuels/playwright-utils');
}

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  debugPort: number;
}>({
  context: async ({ context: _ }, use) => {
    // required for synpress
    (global as any).expect = expect;

    // required for synpress as it shares same expect instance as playwright
    // await setExpectInstance(expect);
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
      browserArgs.push(
        '--disable-gpu',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
      );
    }
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs,
    });

    // Wait for browser and extensions to fully initialize
    // In CI, wait longer (30s) to match the time taken by node:start in pr-tests
    const initialWait = process.env.CI ? 30000 : 5000;
    console.log(`Waiting ${initialWait}ms for extensions to initialize...`);
    await new Promise((resolve) => setTimeout(resolve, initialWait));

    // Get extensions data
    console.log('Getting extensions data...');
    const extensions = await getExtensionsData(context);
    // Wait for Fuel Wallet to load
    console.log('Waiting for extensions to be ready...');
    await waitForExtensions(context, extensions);

    // Additional wait after extensions are ready
    if (process.env.CI) {
      console.log('Additional CI wait (10s)...');
      await new Promise((resolve) => setTimeout(resolve, 10000));
    }

    // Setup MetaMask using Synpress v4 MetaMask class
    const { setMetaMask } = await import('../utils/metamask');
    const synpressPW: any = await import('@synthetixio/synpress/playwright');
    const extensionsData: any = extensions as any;
    const metamaskId =
      extensionsData.metamask?.id ||
      Object.values(extensionsData).find((e: any) => e?.id && e?.version && e)
        ?.id;

    console.log(`Opening MetaMask page (id: ${metamaskId})...`);
    const metamaskPage = await context.newPage();
    await metamaskPage.goto(`chrome-extension://${metamaskId}/home.html`);
    // Wait for MetaMask page to be ready
    await metamaskPage.waitForLoadState('domcontentloaded');
    await metamaskPage.waitForLoadState('networkidle');
    console.log('MetaMask page loaded, waiting for stability...');
    await new Promise((resolve) =>
      setTimeout(resolve, process.env.CI ? 5000 : 2000),
    );

    const MetaMaskCtor =
      synpressPW?.MetaMask || synpressPW?.default || synpressPW;
    const metamask = new MetaMaskCtor(
      context,
      metamaskPage,
      ETH_WALLET_PASSWORD,
      metamaskId,
    );
    setMetaMask(metamask);

    // Import wallet with retry for CI stability
    console.log('Importing wallet...');
    let importRetries = 3;
    while (importRetries > 0) {
      try {
        await metamask.importWallet(ETH_MNEMONIC);
        console.log('Wallet imported successfully');
        break;
      } catch (e) {
        importRetries--;
        if (importRetries === 0) throw e;
        console.log(
          `MetaMask import failed, retrying... (${importRetries} left)`,
        );
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }

    // Wait after wallet import for MetaMask to stabilize
    if (process.env.CI) {
      console.log('Post-import stabilization wait (5s)...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    const targetNetwork = process.env.ETH_NETWORK || 'localhost';
    console.log(`Target network: ${targetNetwork}`);
    // Only switch network for localhost (local dev environment)
    // For testnet (sepolia), skip network switching - it will be handled by the dApp
    if (targetNetwork === 'localhost') {
      try {
        await metamask.switchNetwork(targetNetwork);
      } catch (_) {
        // ignore if network already set
      }
    }
    // For sepolia/testnet, the dApp will request the network switch
    // and MetaMask will prompt the user (handled by approveNewNetwork in test)
    console.log('Fixture setup complete');
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
