import type { ThemeUtilsCSS } from "@fuel-ui/css";
import { cssObj } from "@fuel-ui/css";
import { Box, Flex } from "@fuel-ui/react";
import type { FC, ReactNode } from "react";
import { Helmet } from "react-helmet";
import { META_DESC, META_OGIMG } from "~/constants";
import { OverlayDialog } from "~/systems/Overlay";

import { coreStyles } from "../styles";

import { Header } from "./Header";

type ContentProps = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	as?: any;
	children: ReactNode;
	css?: ThemeUtilsCSS;
};

const Content = ({ as, children, css }: ContentProps) => {
	return (
		<Box
			as={as}
			css={{ ...styles.content, ...css }}
			className="layout__content"
		>
			{children}
		</Box>
	);
};

type LayoutComponent = FC<LayoutProps> & {
	Content: typeof Content;
};

type LayoutProps = {
	title?: string;
	children: ReactNode;
};

export const Layout: LayoutComponent = ({ title, children }: LayoutProps) => {
	const titleText = title || "";
	return (
		<>
			<Helmet>
				<title>{titleText}</title>
				<meta key="desc" name="description" content={META_DESC} />
				<meta property="og:title" content={titleText} />
				<meta property="og:description" content={META_DESC} />
				<meta property="og:image" content={META_OGIMG} />
				{/* TODO: got this favicon code from fuel notion page. can we do it better ? */}
				<link
					rel="shortcut icon"
					type="image/x-icon"
					href="data:image/png;base64,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"
				/>
			</Helmet>
			<Flex as="main" direction="column" css={styles.root}>
				<Header />
				<OverlayDialog />
				<Box css={styles.scrollView}>
					<Box css={coreStyles.scrollableContent}>{children}</Box>
				</Box>
			</Flex>
		</>
	);
};

Layout.Content = Content;

const styles = {
	root: cssObj({
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
		position: "absolute",
	}),
	scrollView: cssObj({
		flex: 1,
		...coreStyles.scrollable(),
	}),
	content: cssObj({
		padding: "$16 $4 $4 $4",
		maxWidth: 955,
		margin: "0 auto",
	}),
};
