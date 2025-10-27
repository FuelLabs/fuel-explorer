'use server';

import { HStack } from '@fuels/ui';
import { PageTitle } from 'app-commons';
import type { Metadata, ResolvingMetadata } from 'next';
import { headers } from 'next/headers';
import { VerifySelectedChainDialog } from '~/systems/Core/components/VerifySelectedChainDialog';
import { MobileWarning } from '~/systems/Staking/screens/MobileWarning';
import { StakingTabs } from '~staking/systems/Staking/components/StakingTabs/StakingTabs';

export async function generateMetadata(
  _props: any,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  return {
    title: 'Fuel Staking',
    description:
      'Help secure the FUEL network by delegating your tokens to Fuel validators.',
  };
}

function isMobileUserAgent(userAgent: string) {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS|Windows Phone/i.test(
    userAgent,
  );
}

export default async function Layout({
  children,
}: { children: React.ReactNode }) {
  const headersList = await headers();
  const ua = headersList.get('user-agent') ?? '';

  return (
    <div>
      <VerifySelectedChainDialog />
      {!isMobileUserAgent(ua) ? (
        <>
          <HStack justify="between">
            <PageTitle
              title=""
              subtitle="Help secure the FUEL network by delegating your tokens to Fuel validators."
            />
          </HStack>
          <StakingTabs />
          {children}
        </>
      ) : (
        <MobileWarning />
      )}
    </div>
  );
}
