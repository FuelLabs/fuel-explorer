import { HStack, Skeleton } from '@fuels/ui';
import { IconCopy } from '@tabler/icons-react';
import { PageTitle } from 'app-commons';

export function TxHeaderLoader({ isSimple }: { isSimple?: boolean }) {
  return (
    <PageTitle
      title="Transaction Details"
      className="mobile:max-tablet:mb-[24px]"
      subtitle={
        isSimple ? null : (
          <HStack gap="3" align="center" justify="center">
            <Skeleton
              height="20px"
              className="mobile:max-tablet:w-[200px] w-[514px]"
            />
            <IconCopy
              className="text-icon opacity-[0.6]"
              width={16}
              height={16}
            />
          </HStack>
        )
      }
    />
  );
}
