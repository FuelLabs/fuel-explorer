"use client";

import { Address, useBreakpoints } from "@fuels/ui";
import { IconChecklist } from "@tabler/icons-react";
import { PageTitle } from "~/systems/Core/components/PageTitle/PageTitle";

export function ContractTitle({ id }: { id: string }) {
  const { isLaptop } = useBreakpoints();
  return (
    <PageTitle
      icon={<IconChecklist size={24} stroke={1.2} />}
      className="border-b-gray-3"
    >
      Contract
      <Address value={id} full={isLaptop} fixed="b256" />
    </PageTitle>
  );
}
