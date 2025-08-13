"use client";

import { useContext } from "react";
import { ModalContext } from "@/components/modals/ModalProvider";

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModalContext must be used within a ModalProvider");
  return ctx;
}
export default useModalContext;
