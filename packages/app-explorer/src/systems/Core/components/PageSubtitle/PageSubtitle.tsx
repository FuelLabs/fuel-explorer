"use client";
import { Text } from "@fuels/ui";

export type PageSubtitleProps = {
	children: React.ReactNode;
};

export function PageSubtitle({ children }: PageSubtitleProps) {
	return <Text className="text-sm text-muted mt-px">{children}</Text>;
}
