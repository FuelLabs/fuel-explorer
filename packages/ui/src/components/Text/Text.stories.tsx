import type { Meta, StoryObj } from '@storybook/react';
import { IconCalendar } from '@tabler/icons-react';

import { Link } from '../Link';

import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Base/Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const UsageText: Story = {
  name: 'Text',
  render: () => <Text>The quick brown fox jumps over the lazy dog.</Text>,
};

export const WithIcon: Story = {
  render: () => <Text leftIcon={IconCalendar}>12/12/2020</Text>,
};

export const Blockquote: Story = {
  render: () => (
    <Text.Blockquote>
      Perfect typography is certainly the most elusive of all arts. Sculpture in
      stone alone comes near it in obstinacy.
    </Text.Blockquote>
  ),
};

export const Code: Story = {
  render: () => <Text.Code>console.log()</Text.Code>,
};

export const Em: Story = {
  render: () => (
    <Text>
      We <Text.Em>had</Text.Em> to do something about it.
    </Text>
  ),
};

export const Kbd: Story = {
  render: () => <Text.Kbd>Shift + Tab</Text.Kbd>,
};

export const Quote: Story = {
  render: () => (
    <Text.Quote>
      Styles come and go. Good design is a language, not a style.
    </Text.Quote>
  ),
};

export const Strong: Story = {
  render: () => (
    <Text>
      The most important thing to remember is,{' '}
      <Text.Strong>stay positive</Text.Strong>.
    </Text>
  ),
};

export const AsChild: Story = {
  render: () => (
    <Text asChild>
      <div>I&apos;m a div</div>
    </Text>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <Text as={Link} href="http://google.com">
      Google
    </Text>
  ),
};
