import { useContext } from 'react';
import { ModalContext } from './ModalProvider';

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModalContext ต้องใช้ภายใน ModalProvider');
  return context;
}
