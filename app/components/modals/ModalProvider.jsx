'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import WarningModal from './WarningModal';
import ConfirmModal from './ConfirmModal';
import LoadingModal from './LoadingModal';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [ready, setReady] = useState(false);
  const [modalState, setModalState] = useState({
    type: '',
    message: '',
    isOpen: false,
    onConfirm: null,
  });

  useEffect(() => {
    setReady(true);
  }, []);

  const showModal = (type, { message = '', onConfirm = null } = {}) => {
    setModalState({ type, message, isOpen: true, onConfirm });
  };

  const closeModal = () => {
    setModalState((prev) => ({ ...prev, isOpen: false, onConfirm: null }));
  };

  if (!ready) return null;

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}

      {modalState.isOpen && modalState.type === 'success' && (
        <SuccessModal open={modalState.isOpen} onClose={closeModal} message={modalState.message} />
      )}
      {modalState.isOpen && modalState.type === 'error' && (
        <ErrorModal open={modalState.isOpen} onClose={closeModal} message={modalState.message} />
      )}
      {modalState.isOpen && modalState.type === 'warning' && (
        <WarningModal open={modalState.isOpen} onClose={closeModal} message={modalState.message} />
      )}
      {modalState.isOpen && modalState.type === 'confirm' && (
        <ConfirmModal open={modalState.isOpen} onClose={closeModal} message={modalState.message} onConfirm={modalState.onConfirm} />
      )}
      {modalState.isOpen && modalState.type === 'loading' && (
        <LoadingModal open={modalState.isOpen} message={modalState.message} />
      )}
    </ModalContext.Provider>
  );
}
