'use client';
import { Heading, Badge } from '@fuels/ui';

export type PageTitleProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function PageTitle({ children, icon }: PageTitleProps) {
  return (
    <Heading
      as="h2"
      size="3"
      className="flex items-center gap-5 text-gray-11 pb-4 border-b border-border font-normal"
    >
      <Badge color="gray" size="2" className="text-lg px-2">
        {icon}
      </Badge>
      {children}
    </Heading>
  );
}
