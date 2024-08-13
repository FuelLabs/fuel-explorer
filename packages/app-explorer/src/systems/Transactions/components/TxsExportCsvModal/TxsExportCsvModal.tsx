'use client';
import React, { useState } from 'react';

const TxsExportCsvModal: React.FC = () => {
  const [transactionType, setTransactionType] =
    useState<string>('Transactions');
  const [address, setAddress] = useState<string>('');
  const [downloadOption, setDownloadOption] = useState<'date' | 'dataBlock'>(
    'date',
  );
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleExportData = (): void => {
    // Handle data export logic here
    console.log('Exporting data...');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Export CSV</h2>
      <div style={styles.field}>
        <label style={styles.label}>Transaction Type</label>
        <select
          style={styles.input}
          value={transactionType}
          onChange={(e) => setTransactionType(e.target.value)}
        >
          <option value="Transactions">Transactions</option>
          <option value="Transfers">Transfers</option>
          {/* Add other options as needed */}
        </select>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Address</label>
        <input
          style={styles.input}
          type="text"
          value={address}
          placeholder="0x...."
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Download Option</label>
        <div style={styles.radioGroup}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="downloadOption"
              value="date"
              checked={downloadOption === 'date'}
              onChange={() => setDownloadOption('date')}
            />
            Date
          </label>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="downloadOption"
              value="dataBlock"
              checked={downloadOption === 'dataBlock'}
              onChange={() => setDownloadOption('dataBlock')}
            />
            Data Block
          </label>
        </div>
      </div>
      <div style={styles.field}>
        <label style={styles.label}>Start Date</label>
        <input
          style={styles.input}
          type="text"
          value={startDate}
          placeholder="0x...."
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div style={styles.field}>
        <label style={styles.label}>End Date</label>
        <input
          style={styles.input}
          type="text"
          value={endDate}
          placeholder="0x...."
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button
        type="button"
        style={styles.exportButton}
        onClick={handleExportData}
      >
        Export Data
      </button>
      <p style={styles.note}>
        The earliest 5,000 records within the selected range will be exported
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: '500px',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    margin: '0 0 20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  field: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    fontSize: '14px',
    color: '#bbb',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '14px',
    color: '#fff',
    backgroundColor: '#333',
    border: '1px solid #444',
    borderRadius: '4px',
  },
  radioGroup: {
    display: 'flex',
    gap: '20px',
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    color: '#bbb',
  },
  exportButton: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#32d74b',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  note: {
    marginTop: '10px',
    fontSize: '12px',
    color: '#777',
  },
};

export default TxsExportCsvModal;
