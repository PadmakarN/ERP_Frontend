// ConfirmModal.jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Styles/ConfirmModal";

export default function ConfirmModal({
  open,
  title = "Confirm",
  message = "Are you sure?",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  const modalRef = useRef(null);
  const prevActive = useRef(null);

  useEffect(() => {
    if (open) {
      prevActive.current = document.activeElement;
      // simple focus management
      modalRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      prevActive.current?.focus?.();
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function onKey(e) {
      if (!open) return;
      if (e.key === "Escape") onCancel?.();
      if (e.key === "Enter") onConfirm?.();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onConfirm, onCancel]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div className="cm-backdrop" role="presentation" onClick={onCancel}>
      <div
        className="cm-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cm-title"
        aria-describedby="cm-desc"
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        ref={modalRef}
      >
        <h3 id="cm-title">{title}</h3>
        <p id="cm-desc">{message}</p>
        <div className="cm-actions">
          <button className="cm-cancel" onClick={onCancel}>{cancelText}</button>
          <button className="cm-confirm" onClick={onConfirm}>{confirmText}</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
