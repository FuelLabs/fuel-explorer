/* eslint-disable no-empty-pattern */
// Use a test fixture to set the context so tests have access to the wallet extension.
import type { BrowserContext } from '@playwright/test';
import { chromium, test as base } from '@playwright/test';
import { initialSetup } from '@synthetixio/synpress/commands/metamask';
import { prepareMetamask } from '@synthetixio/synpress/helpers';
import admZip from 'adm-zip';
import * as fs from 'fs';
import https from 'https';
import path from 'path';

import { ETH_MNEMONIC, ETH_WALLET_PASSWORD } from '../mocks';

const pathToExtension = path.join(__dirname, './dist-crx');

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
}>({
  context: async ({}, use) => {
    // required for synpress
    global.expect = expect;

    const extensionUrl =
      'https://github.com/FuelLabs/fuels-wallet/releases/download/v0.12.0/fuel-wallet-chrome-0.12.0.zip';

    const zipFile = './packages/app/playwright/e2e/fuel-wallet.zip';
    const zipFileStream = fs.createWriteStream(zipFile);

    function downloadFile(url, attempt = 1) {
      return new Promise((resolve, reject) => {
        https
          .get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
              if (attempt > 5) {
                // prevent infinite loops if there's a redirect loop
                reject(new Error('Too many redirects'));
                return;
              }

              const newUrl = res.headers.location;
              console.log(`Redirecting to: ${newUrl}`);
              downloadFile(newUrl, attempt + 1).then(resolve, reject);
              return;
            }

            if (res.statusCode !== 200) {
              reject(new Error(`Unexpected status code: ${res.statusCode}`));
              return;
            }

            res.pipe(zipFileStream);

            zipFileStream.on('finish', () => {
              zipFileStream.close(resolve);
            });

            zipFileStream.on('error', (error) => {
              reject(error);
            });
          })
          .on('error', (error) => {
            reject(error);
          });
      });
    }

    await downloadFile(extensionUrl);

    console.log('Download Completed extracting zip...');
    const zip = new admZip(zipFile);
    zip.extractAllTo('./packages/app/playwright/e2e/dist-crx', true);

    console.log('zip extracted');

    // download metamask
    const metamaskPath = await prepareMetamask(
      process.env.META_MASK_VERSION || '10.25.0'
    );
    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath},${pathToExtension}`,
      `--load-extension=${metamaskPath},${pathToExtension}`,
      '--remote-debugging-port=9222',
    ];

    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs,
    });
    // wait for metamask
    await context.pages()[0].waitForTimeout(3000);
    // setup metamask
    // TODO sometimes this step is flaky, but I'm not sure how to fix
    await initialSetup(chromium, {
      secretWordsOrPrivateKey: ETH_MNEMONIC,
      rpcUrl: 'http://localhost:8080',
      network: 'localhost',
      password: ETH_WALLET_PASSWORD,
      enableAdvancedSettings: true,
    });
    await use(context);
    await context.close();
  },
  extensionId: async ({ context }, use) => {
    let [background] = context.serviceWorkers();
    if (!background) background = await context.waitForEvent('serviceworker');
    const extensionId = background.url().split('/')[2];
    await use(extensionId);
  },
});

export const expect = test.expect;
