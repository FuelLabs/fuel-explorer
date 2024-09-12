'use client';
import { Select } from '@fuels/ui';
import React, { useState } from 'react';

type TxsExportCsvModalProps = {
  closeModal: () => void;
};

const TxsExportCsvModal: React.FC<TxsExportCsvModalProps> = ({
  closeModal,
}) => {
  const [_transactionType, _setTransactionType] =
    useState<string>('Transactions');
  const [address, setAddress] = useState<string>('');
  const [downloadOption, setDownloadOption] = useState<'date' | 'dataBlock'>(
    'date',
  );
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleExportData = (): void => {};

  return (
    <div className="w-[500px] p-[20px] dark:bg-[#1a1a1a] bg-[#ffffff] rounded-[8px] dark:text-white text-black font-sans">
      <div className="w-full flex justify-between items-center mb-5">
        <h2 className="text-[24px] font-bold">Export CSV</h2>
        <button type="button" onClick={closeModal} className="cursor-pointer">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="dark:stroke-white stroke-black"
          >
            <path
              d="M13.067 12.1828C13.1251 12.2409 13.1712 12.3098 13.2026 12.3857C13.234 12.4615 13.2502 12.5429 13.2502 12.625C13.2502 12.7071 13.234 12.7884 13.2026 12.8643C13.1712 12.9402 13.1251 13.0091 13.067 13.0672C13.009 13.1252 12.94 13.1713 12.8642 13.2027C12.7883 13.2342 12.707 13.2503 12.6249 13.2503C12.5427 13.2503 12.4614 13.2342 12.3855 13.2027C12.3097 13.1713 12.2407 13.1252 12.1827 13.0672L6.99986 7.88357L1.81705 13.0672C1.69977 13.1844 1.54071 13.2503 1.37486 13.2503C1.20901 13.2503 1.04995 13.1844 0.932672 13.0672C0.815396 12.9499 0.749512 12.7908 0.749512 12.625C0.749512 12.4591 0.815396 12.3001 0.932672 12.1828L6.11627 6.99998L0.932672 1.81717C0.815396 1.69989 0.749512 1.54083 0.749512 1.37498C0.749512 1.20913 0.815396 1.05007 0.932672 0.932794C1.04995 0.815518 1.20901 0.749634 1.37486 0.749634C1.54071 0.749634 1.69977 0.815518 1.81705 0.932794L6.99986 6.11639L12.1827 0.932794C12.2999 0.815518 12.459 0.749634 12.6249 0.749634C12.7907 0.749634 12.9498 0.815518 13.067 0.932794C13.1843 1.05007 13.2502 1.20913 13.2502 1.37498C13.2502 1.54083 13.1843 1.69989 13.067 1.81717L7.88345 6.99998L13.067 12.1828Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
      {/* <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-400">
          Transaction Type
        </label>
        <select
          className="w-full p-2 py-3 text-sm bg-white text-black "
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Transactions">Transactions</option>
          <option value="Transfers">Transfers</option>
        </select>
      </div> */}
      <Select className="border border-gray-700 rounded-[7px]">
        <Select.Trigger className="w-full p-[10px] py-[12px]" />
        <Select.Content style={{ zIndex: 1000 }}>
          <Select.Item value="transactions">Transactions</Select.Item>
          <Select.Item value="transfers">Transfers</Select.Item>
        </Select.Content>
      </Select>

      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-400">Address</label>
        <input
          className="w-full p-2 py-3 text-sm bg-white text-black border border-gray-700 rounded-[7px]"
          type="text"
          value={address}
          placeholder="0x...."
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mt-10">
        <label className="block mb-1 text-sm text-gray-400">
          Download Option
        </label>
        <div className="flex gap-8">
          <label className="flex items-center text-sm text-gray-400">
            <input
              type="radio"
              name="downloadOption"
              value="date"
              checked={downloadOption === 'date'}
              onChange={() => setDownloadOption('date')}
              className="mr-2"
            />
            Date
          </label>
          <label className="flex items-center text-sm text-gray-400">
            <input
              type="radio"
              name="downloadOption"
              value="dataBlock"
              checked={downloadOption === 'dataBlock'}
              onChange={() => setDownloadOption('dataBlock')}
              className="mr-2"
            />
            Data Block
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-7">
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-400">Start Date</label>
          <input
            className="w-full p-2 py-3 text-sm bg-white text-black border border-gray-700 rounded-[7px]"
            type="text"
            value={startDate}
            placeholder="DD/MM/YYYY"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-400">End Date</label>
          <input
            className="w-full p-2 py-3 text-sm bg-white text-black border border-gray-700 rounded-[7px]"
            type="text"
            value={endDate}
            placeholder="DD/MM/YYYY"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      <button
        type="button"
        className="w-full py-2 text-lg bg-[#00F58C] text-black rounded-[7px] cursor-pointer mt-4"
        onClick={handleExportData}
      >
        Export Data
      </button>
      <p className="mt-2 text-[14px] font-normal text-[#afafaf] w-[75%]">
        The earliest 5,000 records within the selected range will be exported
      </p>
    </div>
  );
};

export default TxsExportCsvModal;
