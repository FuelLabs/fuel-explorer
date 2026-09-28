export const BRIDGE_DOCS_URL =
  'https://docs.fuel.network/docs/fuel-book/the-architecture/security-on-fuel/';

// Withdrawals read the delay from the chain; this covers the first render.
export const DEFAULT_WITHDRAW_DELAY = 'a day';

export const BRIDGE_STEPS = [
  {
    title: 'Connect both wallets',
    description:
      'Connect a Fuel wallet and an Ethereum wallet. The bridge shows both addresses before you send.',
  },
  {
    title: 'Choose an asset and amount',
    description:
      'Pick the asset and enter an amount. MAX fills your full balance.',
  },
  {
    title: 'Confirm and track',
    description:
      'Sign the transaction in your wallet. Every transfer appears in History until it settles.',
  },
];

export function getBridgeFaq(withdrawDelay: string) {
  return [
    {
      question: 'How long does a withdrawal take?',
      answer: `Assets deposited to Fuel can take up to ${withdrawDelay} to withdraw back to Ethereum. The docs explain the architecture and security behind that window.`,
    },
    {
      question: 'Which assets can I bridge?',
      answer:
        'The asset selector lists every supported asset. ETH is selected by default.',
    },
    {
      question: 'Is there a faster route?',
      answer:
        'Partner bridges, like the one in the banner above the form, offer fast bridging to Fuel Ignition.',
    },
    {
      question: 'Where do I see past transfers?',
      answer:
        'Open History at the top of the bridge panel. Pending and completed transfers are listed there.',
    },
    {
      question: 'Can I cancel a transfer?',
      answer:
        'No. A transfer cannot be reversed once you sign it, so check both addresses first.',
    },
  ];
}
