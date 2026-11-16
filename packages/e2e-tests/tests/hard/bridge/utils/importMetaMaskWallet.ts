import type { Page } from '@playwright/test';

// MetaMask 13 splits the phrase into one field per word as each space is
// typed, so typing it whole drops letters while focus moves between fields.
export async function importMetaMaskWallet(
  page: Page,
  mnemonic: string,
  password: string,
) {
  const [first, ...rest] = mnemonic.split(' ');
  await page.getByTestId('onboarding-import-wallet').click();
  await page.getByTestId('onboarding-import-with-srp-button').click();
  await page
    .getByTestId('srp-input-import__srp-note')
    .pressSequentially(`${first} `);
  for (const [i, word] of rest.entries()) {
    const field = page.getByTestId(`import-srp__srp-word-${i + 1}`);
    await field.fill(word);
    if (i < rest.length - 1) await field.press('Space');
  }
  await page.getByTestId('import-srp-confirm').click();
  await page.getByTestId('create-password-new-input').fill(password);
  await page.getByTestId('create-password-confirm-input').fill(password);
  await page.getByTestId('create-password-terms').click();
  await page.getByTestId('create-password-submit').click();
  await page.locator('#metametrics-opt-in').click();
  await page.getByTestId('metametrics-i-agree').click();
  await page.getByTestId('onboarding-complete-done').click();
}
