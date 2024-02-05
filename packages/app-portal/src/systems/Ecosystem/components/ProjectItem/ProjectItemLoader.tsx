import { cssObj } from "@fuel-ui/css";
import { Card, ContentLoader } from "@fuel-ui/react";
import type { ContentLoaderProps } from "@fuel-ui/react";

export const ProjectItemLoader = (props: ContentLoaderProps) => {
	return (
		<Card>
			<ContentLoader
				style={styles.loader}
				height={148}
				viewBox="0 0 496 148"
				{...props}
			>
				<rect x="20" y="20" width="40" height="40" rx="4" />
				<rect x="80" y="20" width="120" height="20" rx="4" />
				<rect x="80" y="50" width="400" height="12" rx="4" />
				<rect x="80" y="70" width="400" height="12" rx="4" />
				<rect x="80" y="110" width="80" height="12" rx="4" />
				<rect x="380" y="110" width="100" height="12" rx="4" />
			</ContentLoader>
		</Card>
	);
};

const styles = {
	loader: cssObj({
		width: "100%",
		maxWidth: "496px",
	}),
};
