import { redirect } from 'next/navigation';

type ContractProps = {
  params: {
    id?: string | null;
  };
};

export default async function Contract({
  params: { id = null },
}: ContractProps) {
  redirect(`./${id}/assets`);
}

// Revalidate cache every 10 seconds
export const revalidate = 10;
