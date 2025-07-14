import React, { createContext, useState, useContext } from 'react';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import WarningModal from './WarningModal';
import ConfirmModal from './ConfirmModal';
import LoadingModal from './LoadingModal';

export const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    type: '',
    message: '',
    isOpen: false,
    onConfirm: null,
  });

  const showModal = (type, { message = '', onConfirm = null } = {}) => {
    setModalState({ type, message, isOpen: true, onConfirm });
  };

  const closeModal = () => {
    setModalState({ ...modalState, isOpen: false, onConfirm: null });
  };

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
