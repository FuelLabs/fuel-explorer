"use client";

import { cx } from "../utils/css";

export type Variant =
	| "solid"
	| "ghost"
	| "outline"
	| "surface"
	| "link"
	| "soft";
export type VariantProps<V = Variant> = {
	className?: string;
	variant?: V;
};

export type WithVariants<
	P,
	V = P extends VariantProps ? P["variant"] : Variant,
> = Omit<P, "variant"> & {
	variant?: V;
};

function getVariant<V = Variant>({ variant, className }: VariantProps<V>) {
	if (variant === "ghost") {
		return {
			variant: "soft",
			className,
		};
	}
	if (variant === "link") {
		return {
			variant: "ghost",
			className: cx(
				"hover:bg-transparent hover:underline px-0.5 py-0.5",
				className,
			),
		};
	}
	return {
		variant,
		className,
	};
}

export function useVariants<P, V = Variant>(props: P) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { variant, className } = getVariant<V>(props as any);
	return { variant: variant as V, className };
}
