'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { RoundedContainer } from '../Box';
import { ChartConfig } from '../Charts';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from '../Select';

export interface DataPoint {
  day: string;
  value: number;
}

interface LineGraphProps {
  dataProp: Record<number, DataPoint[]>;
  titleProp: string;
}

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#00F58C',
  },
} satisfies ChartConfig;

export const LineGraph: React.FC<LineGraphProps> = ({
  dataProp,
  titleProp,
}) => {
  const [selectedDays, setSelectedDays] = useState<number>(1);
  const [selectedPoint, setSelectedPoint] = useState<DataPoint | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const data: DataPoint[] = dataProp[selectedDays] || [];

  useEffect(() => {
    const initialData = dataProp[selectedDays] || [];
    if (initialData.length > 0) {
      setSelectedPoint(initialData[0]);
    }
  }, [selectedDays]);

  const formatNumber = (num: number) => {
    const tempNum = Math.round(num);
    if (tempNum >= 1000000) return `${tempNum / 1000000}M`;
    if (tempNum >= 1000) return `${tempNum / 1000}k`;
    return num.toString();
  };

  const handleClick = (data: any) => {
    setSelectedPoint(data);
  };

  const chartHeight = containerWidth * 0.5;

  return (
    <RoundedContainer ref={containerRef} className="py-4 pr-2 pl-5 pb-7">
      <div className="mt-1 flex items-center" style={{ fontSize: '0.8rem' }}>
        <div className="text-heading">{titleProp} &nbsp;</div>
        <Select
          onValueChange={(value) => setSelectedDays(Number(value))}
          value={selectedDays.toString()}
        >
          <SelectTrigger
            className="px-4 py-0 rounded"
            style={{ fontSize: '0.8rem' }}
          >
            <div className="text-heading">{selectedDays}D</div>
          </SelectTrigger>
          <SelectContent className="bg-gray-2">
            <SelectGroup>
              {Object.keys(dataProp).map((_, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {index + 1}d
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-grow my-3 mt-2">
        {selectedPoint ? (
          <h1 className="text-xl font-mono text-heading">
            {selectedPoint.value}
          </h1>
        ) : (
          <h1 className="text-heading text-xl"> &nbsp; </h1>
        )}
      </div>

      <ResponsiveContainer
        width="100%"
        height={chartHeight}
        className="-ml-4 -mb-4"
      >
        <AreaChart
          data={data}
          onClick={(e) => {
            if (e?.activePayload && e.activePayload.length >= 0) {
              handleClick(e.activePayload[0].payload);
            }
          }}
        >
          <CartesianGrid stroke="rgba(255, 255, 255, 0.04)" />
          <XAxis
            dataKey="day"
            tick={{
              fontSize: 10,
              className: 'fill-heading',
            }}
          />
          <YAxis
            tickFormatter={formatNumber}
            tick={{
              fontSize: 12,
              className: 'fill-heading ',
            }}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14b773" stopOpacity={1} />
              <stop offset="60%" stopColor="#14b773" stopOpacity={0.7} />
              <stop offset="100%" stopColor="#14b773" stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={chartConfig.desktop.color}
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={{ fill: '#14b773', stroke: '#000', strokeWidth: 2, r: 0 }}
            activeDot={{ r: 5 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </RoundedContainer>
  );
};
