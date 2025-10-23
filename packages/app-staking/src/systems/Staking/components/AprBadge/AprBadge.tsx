import { Tooltip } from '@fuels/ui';
import { Badge } from '@fuels/ui';
import { IconInfoCircle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { FUEL_INDEXER_API } from 'app-commons';
import { urlJoin } from 'fuels';

export function AprBadge({ className }: { className?: string }) {
  console.log('asd 111');
  const { data: apy } = useQuery({
    queryKey: ['fuel', 'staking', 'apy'],
    queryFn: async () => {
      console.log('asd 222');
      const { amount } = await fetch(
        urlJoin(FUEL_INDEXER_API, '/staking/apy'),
      ).then((resp) => resp.json());
      return amount;
    },
    refetchOnWindowFocus: false,
  });

  return apy ? (
    <Badge color="blue" className={className}>
      ~{apy}% APR
      <Tooltip content="Help secure Fuel sequencing by delegating your tokens to Fuel validators.">
        <IconInfoCircle size={14} className="ml-1" />
      </Tooltip>
    </Badge>
  ) : null;
}
