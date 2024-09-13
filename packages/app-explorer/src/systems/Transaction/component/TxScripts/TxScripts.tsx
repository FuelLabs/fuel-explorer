import {
  Button,
  Card,
  Heading,
  LoadingBox,
  LoadingWrapper,
  VStack,
} from '@fuels/ui';
import { IconFold } from '@tabler/icons-react';
import { useState } from 'react';
import { EmptyCard } from '~/systems/Core/components/EmptyCard/EmptyCard';
import { TxScriptsContent } from '~/systems/Transaction/component/TxScripts/TxScriptsContent/TxScriptsContent';
import { type TxScriptsProps } from './types';

export function TxScripts({ tx, isLoading, ...props }: TxScriptsProps) {
  const [opened, setOpened] = useState(false);
  const hasOperations = tx?.operations?.length ?? 0 > 0;
  return (
    <VStack {...props}>
      <LoadingWrapper
        repeatLoader={2}
        isLoading={isLoading}
        noItems={!hasOperations}
        regularEl={
          <>
            <Heading
              as="h2"
              size="5"
              className="leading-none flex items-center gap-8"
            >
              Operations
              {opened && (
                <Button
                  className="text-muted"
                  variant="link"
                  color="gray"
                  leftIcon={IconFold}
                  onClick={() => setOpened(false)}
                >
                  Collapse
                </Button>
              )}
            </Heading>
            <TxScriptsContent tx={tx} opened={opened} setOpened={setOpened} />
          </>
        }
        loadingEl={
          <Card className="py-5 px-4 flex flex-row items-center justify-between">
            <LoadingBox className="w-12 h-6" />
            <LoadingBox className="w-24 h-6" />
          </Card>
        }
        noItemsEl={
          <EmptyCard hideImage>
            <EmptyCard.Title>No Operations</EmptyCard.Title>
            <EmptyCard.Description>
              This transaction does not have any operations.
            </EmptyCard.Description>
          </EmptyCard>
        }
      />
    </VStack>
  );
}
