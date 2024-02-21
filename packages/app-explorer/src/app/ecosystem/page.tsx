'use client';
import { EcosystemPage } from 'app-portal/src/systems/Ecosystem/page';

export default function AppBridge() {
  return <EcosystemPage />;
}

export const dynamic = 'force-static';
export const revalidate = Infinity;
