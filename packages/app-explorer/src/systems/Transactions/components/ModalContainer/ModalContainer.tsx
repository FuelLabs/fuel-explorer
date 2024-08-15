'use client';
import React from 'react';
import Modal from 'react-modal';
// Bind modal to your appElement (for accessibility)

const ModalContainer = ({ isOpen, onRequestClose, children }: any) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Custom Modal"
      className="rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;
