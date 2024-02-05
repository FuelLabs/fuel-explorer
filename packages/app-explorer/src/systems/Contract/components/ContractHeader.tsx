"use client";

import { Address } from "@fuels/ui";
import { IconChecklist } from "@tabler/icons-react";
import { PageTitle } from "~/systems/Core/components/PageTitle/PageTitle";

import { ContractTabs } from "./ContractTabs";

export function ContractHeader({ id }: { id: string }) {
  return (
    <>
      <PageTitle
        icon={<IconChecklist size={24} stroke={1.2} />}
        className="border-b-gray-3"
      >
        Contract
        <Address value={id} full={true} fixed="b256" />
      </PageTitle>
      <ContractTabs contractId={id} />
    </>
  );
}
