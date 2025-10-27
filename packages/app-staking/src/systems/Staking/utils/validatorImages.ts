export const VALIDATOR_IMAGES: Record<string, string> = {
  'Simply Staking': '/assets/validators/simply.jpg',
  'Chorus One': '/assets/validators/chorusone.jpg',
  'Informal Systems': '/assets/validators/informal.jpg',
  A41: '/assets/validators/a41.png',
  Chainlayer: '/assets/validators/chainlayer.jpg',
  'Encode Club': '/assets/validators/encodeclub.jpg',
  '✅ CryptoCrew Validators': '/assets/validators/cryptocrew.png',
  'NacionCrypto - Parceros': '/assets/validators/nacioncrypto.jpg',
  StakeCapital: '/assets/validators/stakecapital.jpg',
  'Kintsugi Nodes': '/assets/validators/kintsugi.png',
  'BlockPI Network': '/assets/validators/realblockpi.jpg',
  deNodes: '/assets/validators/denodes.jpg',
  ITRocket: '/assets/validators/itrocket.jpg',
  'Ruby Nodes': '/assets/validators/rubynodes.jpg',
};

// Function to get validator image with fallback
export function getValidatorImage(validatorName?: string): string {
  if (!validatorName) return '';
  return VALIDATOR_IMAGES[validatorName] || '';
}
