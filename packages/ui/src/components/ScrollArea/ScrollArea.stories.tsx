import type { Meta, StoryObj } from '@storybook/react';

import { Box, VStack } from '../Box';
import { Heading } from '../Heading/Heading';
import { Text } from '../Text/Text';

import { ScrollArea } from './ScrollArea';

const meta: Meta<typeof ScrollArea> = {
  title: 'Base/ScrollArea',
  component: ScrollArea,
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

export const Usage: Story = {
  render: () => (
    <ScrollArea
      scrollbars="vertical"
      style={{ width: 400, height: 300 }}
      type="always"
    >
      <Box className="p-2 pr-8">
        <Heading className="mb-4" size="3">
          Principles of the typographic craft
        </Heading>
        <VStack>
          <Text as="p">
            Three fundamental aspects of typography are legibility, readability,
            and aesthetics. Although in a non-technical sense “legible” and
            “readable” are often used synonymously, typographically they are
            separate but related concepts.
          </Text>

          <Text as="p">
            Legibility describes how easily individual characters can be
            distinguished from one another. It is described by Walter Tracy as
            “the quality of being decipherable and recognisable”. For instance,
            if a “b” and an “h”, or a “3” and an “8”, are difficult to
            distinguish at small sizes, this is a problem of legibility.
          </Text>

          <Text as="p">
            Typographers are concerned with legibility insofar as it is their
            job to select the correct font to use. Brush Script is an example of
            a font containing many characters that might be difficult to
            distinguish. The selection of cases influences the legibility of
            typography because using only uppercase letters (all-caps) reduces
            legibility.
          </Text>
        </VStack>
      </Box>
    </ScrollArea>
  ),
};
