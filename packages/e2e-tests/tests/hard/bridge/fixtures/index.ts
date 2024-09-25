// Use a test fixture to set the context so tests have access to the wallet extension.
import { downloadFuel } from '@fuels/playwright-utils';
import type { BrowserContext } from '@playwright/test';
import { chromium, test as base } from '@playwright/test';
import { initialSetup } from '@synthetixio/synpress/commands/metamask';
import { prepareMetamask } from '@synthetixio/synpress/helpers';

import { ETH_MNEMONIC, ETH_WALLET_PASSWORD } from '../mocks';

import { getExtensionsData } from './utils/getExtensionsData';
import { waitForExtensions } from './utils/waitForExtenssions';

const FUEL_WALLET_VERSION = '0.30.0';
const META_MASK_VERSION = '11.11.4';

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({ context: _ }, use) => {
    // required for synpress
    global.expect = expect;
    // download fuel wallet
    const fuelPathExtension = await downloadFuel(FUEL_WALLET_VERSION);
    // download metamask
    const metamaskPath = await prepareMetamask(META_MASK_VERSION);
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath},${fuelPathExtension}`,
      `--load-extension=${metamaskPath},${fuelPathExtension}`,
      '--remote-debugging-port=9222',
    ];
    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs,
    });
    // Ge extenssions data
    const extenssions = await getExtensionsData(context);
    // Wait for Fuel Wallet to load
    await waitForExtensions(context, extenssions);
    // Setup cynpress MetaMask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: ETH_MNEMONIC,
      network: 'localhost',
      password: ETH_WALLET_PASSWORD,
      enableAdvancedSettings: true,
      enableExperimentalSettings: false,
    });
    // Set context to playwright
    await use(context);
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent('serviceworker');
    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
});

export const expect = test.expect;
