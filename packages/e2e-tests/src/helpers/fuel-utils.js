// Auto-initializing singleton pattern for fuel utils
let cachedUtils = null;
let initPromise = null;

// Auto-initialize on first use
async function ensureInitialized() {
  if (!cachedUtils && !initPromise) {
    initPromise = import('@fuels/playwright-utils');
    cachedUtils = await initPromise;
  } else if (initPromise && !cachedUtils) {
    cachedUtils = await initPromise;
  }
  return cachedUtils;
}

// Export functions that auto-initialize
export async function getButtonByText(page, text) {
  const utils = await ensureInitialized();
  return utils.getButtonByText(page, text);
}

export async function getByAriaLabel(page, label, exact = false) {
  const utils = await ensureInitialized();
  return utils.getByAriaLabel(page, label, exact);
}

export async function getFuelWalletTestHelper() {
  const utils = await ensureInitialized();
  return utils.FuelWalletTestHelper;
}

export async function getFuelMnemonic() {
  const utils = await ensureInitialized();
  return utils.FUEL_MNEMONIC;
}

export async function hasText(page, text) {
  const utils = await ensureInitialized();
  return utils.hasText(page, text);
}

export async function waitAriaLabel(page, label) {
  const utils = await ensureInitialized();
  return utils.waitAriaLabel(page, label);
}

// For CommonJS compatibility
module.exports = {
  getButtonByText,
  getByAriaLabel,
  getFuelWalletTestHelper,
  getFuelMnemonic,
  hasText,
  waitAriaLabel,
};
