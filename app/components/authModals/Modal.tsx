"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

interface ModalProps {
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
}

const Modal = ({
  title,
  body,
  footer,
  actionLabel,
  disabled,
  isOpen,
  onClose,
  onSubmit,
  secondaryAction: secondaryAction,
  secondaryActionLabel: secondaryActionLabel,
}: ModalProps) => {
  const [openModal, setOpenModal] = useState(isOpen);

  useEffect(() => {
    setOpenModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    setOpenModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disabled, secondaryAction]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70 overflow-x-hidden overflow-y-auto">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 mx-auto my-6 h-full md:h-auto lg:h-auto">
          <div
            className={`translate duration-300 h-full
            ${openModal ? "translate-y-0" : "translate-y-full"} 
            ${openModal ? "opacity-100" : "opacity-0"}`}
          >
            <div className="relative translate h-full w-full bg-white outline-none focus:outline-none flex flex-col border-0 md:h-auto lg:h-auto rounded-lg shadow-lg">
              <div className="flex justify-center items-center relative rounded-t p-6 border-b-[1px]">
                <button
                  onClick={handleClose}
                  className="border-0 absolute p-1 transition left-5 hover:bg-slate-200/70 rounded-full"
                >
                  <IoMdClose size={18} />
                </button>
                <div className="text-lg font-semibold">{title}</div>
              </div>

              <div className="relative p-6 flex-auto">{body}</div>

              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      label={secondaryActionLabel}
                      disabled={disabled}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}
                  <Button
                    label={actionLabel}
                    disabled={disabled}
                    onClick={handleSubmit}
                  />
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
