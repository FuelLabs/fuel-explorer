const PROMPT_TIMEOUT = 120_000;
const OPTIONAL_PROMPT_TIMEOUT = 30_000;
const POLL_INTERVAL = 500;
const RELOAD_INTERVAL = 45_000;

let metaMask: { tab: Page; extensionId: string; password: string } | null =
  null;

export function setMetaMask(tab: Page, extensionId: string, password: string) {
  metaMask = { tab, extensionId, password };
}

function requireMetaMask() {
  if (!metaMask) throw new Error('MetaMask is not set up');
  return metaMask;
}

// MetaMask shows a request in its popup or, when it opens none, in its own
// tab once that tab reloads the prompt page. Either may sit behind the unlock
// screen.
async function clickInPrompt(testId: string, timeout = PROMPT_TIMEOUT) {
  const { tab, extensionId, password } = requireMetaMask();
  const deadline = Date.now() + timeout;
  let nextReload = Date.now() + RELOAD_INTERVAL;
  while (Date.now() < deadline) {
    const pages = tab
      .context()
      .pages()
      .filter(
        (page) =>
          !page.isClosed() &&
          page.url().startsWith(`chrome-extension://${extensionId}/`),
      );
    for (const page of pages) {
      try {
        const unlock = page.getByTestId('unlock-password');
        if (await unlock.isVisible()) {
          await unlock.fill(password);
          await page.getByTestId('unlock-submit').click();
          continue;
        }
        const button = page.getByTestId(testId);
        if ((await button.isVisible()) && (await button.isEnabled())) {
          await button.click();
          return;
        }
      } catch (error) {
        // MetaMask closes its popup once a request is answered.
        if (!page.isClosed()) throw error;
      }
    }
    if (Date.now() > nextReload) {
      await tab.goto(`chrome-extension://${extensionId}/notification.html`);
      nextReload = Date.now() + RELOAD_INTERVAL;
    }
    await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL));
  }
  throw new Error(`MetaMask did not show ${testId} within ${timeout} ms`);
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
