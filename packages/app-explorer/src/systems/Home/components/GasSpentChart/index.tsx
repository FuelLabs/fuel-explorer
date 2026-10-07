import {
  AnimatedNumber,
  type ChartConfig,
  HStack,
  RoundedContainer,
} from '@fuels/ui';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts';
import { InfoHint } from '~/systems/Core/components/InfoHint/InfoHint';

const usdFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// The API sends the total as a display string; count it when it parses.
function UsdAmount({ value }: { value: string }) {
  const amount = Number(String(value).replace(/[^0-9.-]/g, ''));
  if (!Number.isFinite(amount)) return <>{value}</>;
  return <AnimatedNumber value={amount} format={(v) => usdFormat.format(v)} />;
}

const chartConfig = {
  fuel: {
    label: 'FUEL',
    color: 'var(--fuel-primary)', // Light green for FUEL
  },
} satisfies ChartConfig;

interface GasSpentProps {
  blocks: any;
}
const GasSpentChart = ({ blocks }: GasSpentProps) => {
  const { t } = useTranslation();
  const { totalGasSpent, chartData, index } = useMemo(() => {
    if (!blocks || typeof blocks !== 'object') {
      return {
        totalGasSpent: '0',
        chartData: [],
        index: {},
      };
    }

    const totalGasSpent = blocks.total || '0';

    if (!Array.isArray(blocks.data) || blocks.data.length === 0) {
      return {
        totalGasSpent,
        chartData: [],
        index: {},
      };
    }

    const chartData = blocks.data
      .map((e: any) => {
        return {
          time: dayjs(Number(e?.date || 0)).format('HH:mm'),
          ETH: +(e?.value || 0),
        };
      })
      .slice(0, blocks.data.length - 1);

    const index: any = {};
    for (const e of blocks.data) {
      if (e && e.value !== undefined) {
        index[e.value] = e.valueInUsd || '0';
      }
    }
    return {
      totalGasSpent,
      chartData,
      index,
    };
  }, [blocks]);

  return (
    <RoundedContainer className="py-4 h-full px-5 space-y-3 ">
      <div className="space-y-[16px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="fuel-label">{t('home.fee_spent')}</span>
            <InfoHint content={t('home.fee_spent_hint')} />
          </div>
          <span className="fuel-label block">{t('common.window_24h')}</span>
        </div>
        <HStack align={'baseline'}>
          <h2 className="fuel-stat whitespace-nowrap">
            <UsdAmount value={totalGasSpent} />
          </h2>
          <p className="text-[11px] text-heading font-regular text-muted">
            {t('home.usd')}
          </p>
        </HStack>
        <ResponsiveContainer width="100%" height={170}>
          <LineChart
            data={chartData}
            margin={{ top: 10, left: 0, right: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--fuel-grid-line)"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ className: 'fill-heading', fontSize: '12px' }}
            />
            <Tooltip
              formatter={(value: any) => [`${index[String(value)] || '0'}`]}
              labelFormatter={(label: any) => label.toLocaleString()}
              contentStyle={{
                backgroundColor: 'var(--fuel-background)',
                borderColor: 'var(--fuel-line)',
                borderRadius: 0,
                color: 'var(--fuel-element-high-em)',
              }}
              labelStyle={{
                color: 'var(--fuel-element-high-em)',
                fontWeight: 'bold',
              }}
              itemStyle={{
                color: 'var(--fuel-primary)',
              }}
              cursor={{ strokeWidth: 0.1, radius: 10 }}
            />

            <Line
              type="monotone"
              dataKey="ETH"
              stroke={chartConfig.fuel.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </RoundedContainer>
  );
};
export default GasSpentChart;
