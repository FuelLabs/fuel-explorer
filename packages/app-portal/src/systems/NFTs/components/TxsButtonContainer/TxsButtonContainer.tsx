import React, { useState } from 'react';
import ModalContainer from '../ModalContainer/ModalContainer';
import TxsButton from '../TxsButton/TxsButton';
import TxsExportCsvModal from '../TxsExportCsvModal/TxsExportCsvModal';

function TxsButtonContainer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex justify-end gap-4 ">
      <TxsButton>
        <p className="dark:text-white text-black">Download Page Data</p>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2"
        >
          <path
            d="M13 9V11.6667C13 12.0203 12.8595 12.3594 12.6095 12.6095C12.3594 12.8595 12.0203 13 11.6667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V9M3.66667 5.66667L7 9M7 9L10.3333 5.66667M7 9V1"
            className="stroke-black dark:stroke-white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </TxsButton>
      <TxsButton>
        <button
          type="button"
          className="dark:text-white text-black"
          onClick={openModal}
        >
          Export CSV
        </button>
        <svg
          width="14"
          height="16"
          viewBox="0 0 14 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="ml-2"
        >
          <path
            d="M8.33335 1.33333H3.00002C2.6464 1.33333 2.30726 1.4738 2.05721 1.72385C1.80716 1.9739 1.66669 2.31304 1.66669 2.66666V13.3333C1.66669 13.687 1.80716 14.0261 2.05721 14.2761C2.30726 14.5262 2.6464 14.6667 3.00002 14.6667H11C11.3536 14.6667 11.6928 14.5262 11.9428 14.2761C12.1929 14.0261 12.3334 13.687 12.3334 13.3333V5.33333M8.33335 1.33333L12.3334 5.33333M8.33335 1.33333L8.33335 5.33333H12.3334M9.66669 8.66666H4.33335M9.66669 11.3333H4.33335M5.66669 5.99999H4.33335"
            className="stroke-black dark:stroke-white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </TxsButton>
      <ModalContainer isOpen={isModalOpen} onRequestClose={closeModal}>
        <TxsExportCsvModal closeModal={closeModal} />
      </ModalContainer>
    </div>
  );
}

export default TxsButtonContainer;
