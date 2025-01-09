"use client";

import React, { useCallback } from "react";
import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  title?: string;
  disabled?: boolean;
  submitButton?: boolean;
  googleButton?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel?: string;
  onSubmit?: () => void;
  onClose?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  disabled,
  body,
  footer,
  actionLabel,
  onClose,
  onSubmit,
  googleButton,
  submitButton,
}) => {
  const handleClose = useCallback(() => {
    if (disabled || !onClose) return;
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled || !onSubmit) return;
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50
        overflow-hidden"
    >
      <div
        className="
          relative w-full max-w-md lg:max-w-lg mx-auto bg-white rounded-lg shadow-lg overflow-hidden
          animate-fade-in"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-[#F1C40F]">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button
            onClick={handleClose}
            className="p-1 text-white hover:opacity-75 transition"
            aria-label="Close modal"
          >
            <IoCloseOutline size={24} />
          </button>
        </div>

        <div className="px-6 py-4">{body}</div>

        <div className="px-6 py-4 flex flex-col gap-3">
          {submitButton && (
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          )}
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;
