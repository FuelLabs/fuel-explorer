import { cssObj } from "@fuel-ui/css";
import { Box, Heading, Icon, Input, Text } from "@fuel-ui/react";
import { Layout, animations } from "~/systems/Core";

import { EcosystemTags } from "../components/EcosystemTags";
import { ProjectList } from "../components/ProjectList/ProjectList";
import { useEcosystem } from "../hooks/useEcosystem";

export function Ecosystem() {
	const { tags, isLoading, filter, search, handlers, filteredProjects } =
		useEcosystem();

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		handlers.searchProjects({ query: e.target.value });
	};

	const handleTagButtonClick = (tag: string) => {
		handlers.filterProjects({ tag });
	};

	const emptyText = search?.length
		? "No results found for your search."
		: undefined;

	return (
		<Layout {...animations.slideInTop()}>
			<Layout.Content css={{ padding: "$16 $1 $4 $4" }}>
				<Box.Stack gap="$12" grow={1} css={styles.content}>
					<Box.Flex css={styles.headingWrapper}>
						<Box.Stack gap="$2" wrap="wrap">
							<Heading as="h2" css={styles.heading}>
								Explore Fuel Dapps
							</Heading>
							<Text color="intentsBase11">
								Here&apos;s a list of dapps built on Fuel
							</Text>
						</Box.Stack>
						<Input css={styles.searchBar}>
							<Input.Field
								name="search"
								placeholder="Search"
								type="text"
								value={search || ""}
								onChange={handleSearch}
							/>
							<Input.ElementRight element={<Icon icon="Search" />} />
						</Input>
					</Box.Flex>
					<EcosystemTags
						tags={tags}
						activeTag={filter}
						isLoading={isLoading}
						onClickTag={handleTagButtonClick}
						onClickAllCategories={handlers.clearFilters}
					/>
					<ProjectList
						isLoading={isLoading}
						projects={filteredProjects || []}
						emptyText={emptyText}
					/>
				</Box.Stack>
			</Layout.Content>
		</Layout>
	);
}

const styles = {
	content: cssObj({
		paddingBottom: "$20",
	}),
	heading: cssObj({
		margin: 0,
	}),
	subHeading: cssObj({
		fontSize: "0.875rem",
	}),
	headingWrapper: cssObj({
		flexDirection: "column",
		gap: "$10",
		alignItems: "flex-start",
		justifyContent: "space-between",

		"@sm": {
			flexDirection: "row",
			gap: "$10",
			alignItems: "flex-end",
		},
	}),
	searchBar: cssObj({
		width: "100%",
		"@sm": {
			width: "auto",
		},
	}),
};
