"use client";

import { Theme, Toaster } from "@fuels/ui";

export function Provider({
  children,
  theme,
}: {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: any;
}) {
  return (
    <Theme appearance={theme} hasBackground={false}>
      {children}
      <Toaster />
    </Theme>
  );
}
