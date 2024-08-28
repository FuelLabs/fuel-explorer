'use client';
import { TxsTab } from '../TxsTab/TsxTab';

export type TxsTabListProps = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export function TxsTabList({ activeTab, setActiveTab }: TxsTabListProps) {
  // Default active tab

  const tabList = [
    { name: 'Top Tokens' },
    { name: 'Top NFTs' },
    { name: 'Top Accounts' },
  ];

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex gap-4">
      {tabList.map((tab) => (
        <TxsTab
          key={tab.name}
          tabTitle={tab.name}
          isActive={activeTab === tab.name}
          onClick={() => handleTabClick(tab.name)}
        />
      ))}
    </div>
  );
}
