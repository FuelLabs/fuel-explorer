"use client";
import "@fuels/ui/styles.css";
import "./error.css";
import "./globals.css";

import Cookies from "js-cookie";
import type { Metadata } from "next";
import { ErrorPageComponent } from "~/systems/Core/components/ErrorPage/ErrorPage";
import { Provider } from "~/systems/Core/components/Provider";
import { cx } from "~/systems/Core/utils/cx";

export const metadata: Metadata = {
	title: "Fuel Explorer",
	description: "Explorer of the Fastest execution layer",
};

export default function Page() {
	const value = Cookies.get("fuel-theme") ?? "dark";
	return (
		<html
			suppressHydrationWarning
			lang="en"
			className={cx(value)}
			style={{ colorScheme: value } as React.CSSProperties}
		>
			<head>
				<link rel="icon" href="/favicon.svg" />
			</head>
			<body>
				<Provider theme={value}>
					<ErrorPageComponent />
				</Provider>
			</body>
		</html>
	);
}
