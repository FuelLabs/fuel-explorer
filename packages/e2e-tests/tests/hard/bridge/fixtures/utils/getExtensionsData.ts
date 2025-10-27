/**
 * This code is required to avoid synpress to start without
 * the extensions be ready making it fail.
 *
 * This code was copied from the synpress codebase to be used as a standalone function.
 * https://github.com/Synthetixio/synpress/blob/81faa920fb683b1b579fde5214f923c758877157/commands/playwright.js#L445
 */

import type { BrowserContext } from '@playwright/test';

export async function getExtensionsData(context: BrowserContext) {
  console.log('getExtensionsData called');
  const extensionsData = {};
  const page = await context.newPage();

  await page.goto('chrome://extensions');
  await page.waitForLoadState('load');
  await page.waitForLoadState('domcontentloaded');

  const devModeButton = page.locator('#devMode');
  await devModeButton.waitFor();
  await devModeButton.focus();
  await devModeButton.click();

  const extensionDataItems = await page.locator('extensions-item').all();
  for (const extensionData of extensionDataItems) {
    const extensionName = (
      await extensionData
        .locator('#name-and-version')
        .locator('#name')
        .textContent()
    )
      .toLowerCase()
      .trim();

    const extensionVersion = (
      await extensionData
        .locator('#name-and-version')
        .locator('#version')
        .textContent()
    )
      .replace(/(\n| )/g, '')
      .trim();

    console.log('extensionData', extensionData);
    const extensionId = (
      await extensionData.locator('#extension-id').textContent()
    )
      .replace('ID: ', '')
      .trim();

    extensionsData[extensionName] = {
      version: extensionVersion,
      id: extensionId,
    };
  }

  await devModeButton.waitFor();
  await devModeButton.focus();
  await devModeButton.click();
  await page.close();

  return extensionsData;
}
