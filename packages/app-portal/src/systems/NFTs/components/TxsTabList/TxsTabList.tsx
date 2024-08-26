'use client';
import { TxsTab } from '../TxsTab/TsxTab';

export function TxsTabList({
  activeTab,
  setActiveTab,
}: { activeTab: string; setActiveTab: (tabName: string) => void }) {
  const tabList = [
    { name: 'Activity' },
    { name: 'Holders' },
    { name: 'Contract' },
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
