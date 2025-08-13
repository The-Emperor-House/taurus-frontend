"use client";

import { createContext, useMemo, useState } from "react";
import LoadingDialog from "./LoadingDialog";
import ConfirmDialog from "./ConfirmDialog";

export const ModalContext = createContext(null);

export default function ModalProvider({ children }) {
  const [loading, setLoading] = useState({ open: false, text: "" });
  const [confirm, setConfirm] = useState({
    open: false,
    title: "Confirm",
    message: "Are you sure?",
    confirmText: "Confirm",
    cancelText: "Cancel",
    _resolver: null,
  });

  const value = useMemo(
    () => ({
      showLoading: (text = "Loading...") => setLoading({ open: true, text }),
      hideLoading: () => setLoading({ open: false, text: "" }),
      confirm: (opts = {}) =>
        new Promise((resolve) =>
          setConfirm((prev) => ({
            ...prev,
            ...opts,
            open: true,
            _resolver: resolve,
          }))
        ),
    }),
    []
  );

  const handleConfirmClose = (ok) => {
    if (confirm._resolver) confirm._resolver(!!ok);
    setConfirm((prev) => ({ ...prev, open: false, _resolver: null }));
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <LoadingDialog open={loading.open} text={loading.text} />
      <ConfirmDialog
        open={confirm.open}
        title={confirm.title}
        message={confirm.message}
        confirmText={confirm.confirmText}
        cancelText={confirm.cancelText}
        onClose={handleConfirmClose}
      />
    </ModalContext.Provider>
  );
}
