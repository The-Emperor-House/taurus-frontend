"use client";

import { useContext } from "react";
import { ModalContext } from "@/components/modals/ModalProvider";

export function useModalContext() {
  const ctx = useContext(ModalContext);
  const showModal = ctx.showModal || ctx.openModal;
  const closeModal = ctx.closeModal || ctx.hideModal;

  if (!ctx) throw new Error("useModalContext must be used within a ModalProvider");
  return { ...ctx, showModal, closeModal };
}
export default useModalContext;
