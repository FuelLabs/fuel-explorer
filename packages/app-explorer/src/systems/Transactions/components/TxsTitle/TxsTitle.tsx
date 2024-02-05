"use client";
import { Icon } from "@fuels/ui";
import { IconListDetails } from "@tabler/icons-react";
import { PageTitle } from "~/systems/Core/components/PageTitle/PageTitle";

export function TxsTitle() {
	return (
		<PageTitle icon={<Icon icon={IconListDetails} />}>
			Recent Transactions
		</PageTitle>
	);
}
