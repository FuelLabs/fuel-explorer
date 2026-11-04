import type { BrowserContext, Page } from '@playwright/test';

const PROMPT_TIMEOUT = 60_000;
const OPTIONAL_PROMPT_TIMEOUT = 30_000;
const SUBMIT_TIMEOUT = 10_000;

let metaMask: { context: BrowserContext; extensionId: string } | null = null;

export function setMetaMask(context: BrowserContext, extensionId: string) {
  metaMask = { context, extensionId };
}

function requireMetaMask() {
  if (!metaMask) throw new Error('MetaMask is not set up');
  return metaMask;
}

// MetaMask 13 does not reliably open its own popup window under automation, so
// pending requests are opened in a tab of our own.
async function openPrompt(): Promise<Page> {
  const { context, extensionId } = requireMetaMask();
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/notification.html`);
  return page;
}

async function clickInPrompt(testId: string, timeout = PROMPT_TIMEOUT) {
  const page = await openPrompt();
  try {
    await page.getByTestId(testId).click({ timeout });
    // Closing the tab while MetaMask is still submitting cancels the request.
    await page
      .waitForEvent('close', { timeout: SUBMIT_TIMEOUT })
      .catch(() => {});
  } finally {
    if (!page.isClosed()) await page.close();
  }
}

export async function connectToDapp() {
  await clickInPrompt('confirm-btn');
}

export async function approveNewNetwork() {
  await clickInPrompt('confirmation-submit-button', OPTIONAL_PROMPT_TIMEOUT);
}

export async function approveSwitchNetwork() {
  await clickInPrompt('confirmation-submit-button', OPTIONAL_PROMPT_TIMEOUT);
}

export async function confirmTransaction() {
  await clickInPrompt('confirm-footer-button');
}

export async function confirmPermissionToSpend() {
  await clickInPrompt('confirm-footer-button');
}

export default {
  connectToDapp,
  approveNewNetwork,
  approveSwitchNetwork,
  confirmTransaction,
  confirmPermissionToSpend,
};
