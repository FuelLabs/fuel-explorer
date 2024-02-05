import { cssObj } from "@fuel-ui/css";
import { Box, Icon, Spinner, Text } from "@fuel-ui/react";
import type { ReactNode } from "react";

type Step = {
	name: ReactNode;
	status: ReactNode;
	isLoading?: boolean;
	isDone?: boolean;
	isSelected?: boolean;
};

type BridgeStepsProps = {
	steps?: Step[];
};

export const BridgeSteps = ({ steps }: BridgeStepsProps) => {
	return (
		<Box.Stack css={styles.stack}>
			{steps?.map((step, index) => {
				return (
					<Box.Flex key={`${index}_${step.name?.toString()}`} css={styles.item}>
						<Box.Flex css={styles.action}>
							<Box
								className={step.isDone ? "circleDone" : undefined}
								css={{
									...styles.circle,
									borderColor: step.isSelected ? "$intentsPrimary9" : undefined,
								}}
							>
								{step.isDone ? (
									<Icon icon="Check" size={12} css={styles.icon} />
								) : (
									<Text
										color={step.isSelected ? "intentsBase12" : undefined}
										css={styles.number}
										fontSize="xs"
									>
										{index + 1}
									</Text>
								)}
							</Box>
							<Text fontSize="sm" color="intentsBase12" css={styles.name}>
								{step.name}
							</Text>
						</Box.Flex>
						<Box.Flex align="center" gap="$1">
							{step.isLoading && <Spinner size={14} />}
							<Text
								fontSize="sm"
								aria-label={`Step ${step.name?.toString()}: ${step.status}`}
							>
								{step.status}
							</Text>
						</Box.Flex>
					</Box.Flex>
				);
			})}
		</Box.Stack>
	);
};

const styles = {
	stack: cssObj({
		gap: "$0",
		minWidth: "344px",
		borderRadius: "$md",
		border: "1px solid $border",
		backgroundColor: "$inputBaseBg",
	}),
	item: cssObj({
		alignItems: "center",
		justifyContent: "space-between",
		px: "$3",
		py: "$2",

		"& ~ &": {
			borderTop: "1px solid $border",
		},

		".circleDone": {
			backgroundColor: "$intentsPrimary9",
			border: "1px solid $intentsPrimary9",
		},
	}),
	action: cssObj({
		gap: "$2",
		alignItems: "center",
	}),
	name: cssObj({
		lineHeight: "1.5rem",
	}),
	icon: cssObj({
		color: "$blackA12",
	}),
	number: cssObj({
		display: "flex",
		justifyContent: "center",
		fontSize: "10px",
	}),
	circle: cssObj({
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		minWidth: "$4",
		height: "$4",
		border: "1px solid $intentsBase5",
		borderRadius: "$full",
	}),
};
