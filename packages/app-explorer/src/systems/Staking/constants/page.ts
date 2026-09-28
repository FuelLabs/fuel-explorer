import type { ToolFaqItem } from '~/systems/Core/components/ToolPage/ToolFaq';
import type { ToolStep } from '~/systems/Core/components/ToolPage/ToolSteps';

export const STAKING_DOCS_URL = 'https://docs.fuel.network/docs/fuel-book/';
export const RIG_URL = 'https://rig.st/';

export const STAKING_STEPS: ToolStep[] = [
  {
    title: 'Connect your wallet',
    description:
      'Connect the Ethereum wallet that holds your FUEL. The page lists the tokens you can stake.',
  },
  {
    title: 'Choose a validator',
    description:
      'Open Validators and pick who receives your delegation. Validators secure Fuel sequencing.',
  },
  {
    title: 'Stake and track',
    description:
      'Confirm in your wallet. Current positions and Your transactions list every stake and unstake.',
  },
];

export const STAKING_FAQ: ToolFaqItem[] = [
  {
    question: 'What is The Rig?',
    answer:
      'The Rig is a liquid staking protocol on Ignition. Staking on Fuel has migrated to it, and it compounds rewards automatically.',
  },
  {
    question: 'How long does unstaking take?',
    answer:
      'An unstake waits for synchronization and then an unbonding period before the tokens are released. The status dialog shows each stage.',
  },
  {
    question: 'Where do I see my stake?',
    answer:
      'Current positions lists every validator you delegate to. Your transactions lists each stake and unstake.',
  },
  {
    question: 'What does the APR badge show?',
    answer:
      'An estimate of the yearly reward rate for staking on Ethereum. It is read from the Fuel indexer and changes over time.',
  },
];
