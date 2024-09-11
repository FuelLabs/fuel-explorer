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
  dataProp: any;
  titleProp: string;
  selectedDays: string;
  setSelectedDays: (p: string) => void;
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
  selectedDays,
  setSelectedDays,
}) => {
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
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

  const data = dataProp;

  useEffect(() => {
    const initialData = dataProp;
    if (initialData.length > 0) {
      setSelectedPoint(initialData[0]);
    }
  }, [selectedDays]);

  const handleClick = (data: any) => {
    setSelectedPoint(data);
  };

  const chartHeight = containerWidth * 0.5;

  return (
    <RoundedContainer ref={containerRef} className="py-4 pr-2 pl-5 pb-7">
      <div className="mt-1 flex items-center" style={{ fontSize: '0.8rem' }}>
        <div className="text-heading">{titleProp} &nbsp;</div>
        <Select
          onValueChange={(value) => setSelectedDays(value)}
          value={selectedDays}
        >
          <SelectTrigger
            className="px-4 py-0 rounded"
            style={{ fontSize: '0.8rem' }}
          >
            <div className="text-heading">{selectedDays}</div>
          </SelectTrigger>
          <SelectContent className="bg-gray-2">
            <SelectGroup>
              <SelectItem value="null">All time</SelectItem>
              <SelectItem value="1hr">1 Hr</SelectItem>
              <SelectItem value="12hr">12 Hr</SelectItem>
              <SelectItem value="1day">1 Day</SelectItem>
              <SelectItem value="7days">7 Day</SelectItem>
              <SelectItem value="14days">14 Day</SelectItem>
              <SelectItem value="30days">30 Day</SelectItem>
              <SelectItem value="90days">90 Day</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex-grow my-3 mt-2">
        {selectedPoint ? (
          <h1 className="text-xl font-mono text-heading">
            {selectedPoint.count}
          </h1>
        ) : (
          <h1 className="text-heading text-xl"> &nbsp; </h1>
        )}
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <AreaChart
          data={data}
          onClick={(e) => {
            if (e?.activePayload && e.activePayload.length >= 0) {
              handleClick(e.activePayload[0].payload);
            }
          }}
        >
          <CartesianGrid stroke="rgba(255, 255, 255, 0.04)" />

          {/* X Axis - using 'start' and formatting the date */}
          <XAxis
            dataKey="start"
            tickFormatter={(tick) => new Date(tick).toLocaleDateString()} // Converts timestamp to readable date
            tick={{
              fontSize: 10,
              className: 'fill-heading',
            }}
          />

          {/* Y Axis - using 'count' to display the number */}
          <YAxis
            tick={{
              fontSize: 12,
              className: 'fill-heading',
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
            dataKey="count"
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
