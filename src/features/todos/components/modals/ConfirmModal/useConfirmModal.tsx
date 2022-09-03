import { useState, useCallback } from 'react';
import { ConfirmModal } from './index';

type OnOkHandlerType = Function | undefined;

export const useConfirmModal = () => {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [onOkHandler, setOnOkHandler] = useState<OnOkHandlerType>();

  const open = useCallback(
    (callback: OnOkHandlerType) => {
      setIsOpen(true);
      setOnOkHandler(() => {
        return callback;
      })
    },
     [setIsOpen, setOnOkHandler]
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const ConfirmModalWrapper = useCallback(() => {
    return (
      <ConfirmModal 
        isOpen={isOpen}
        message={message}
        onClickOk={() => {
          if (onOkHandler) {
            return onOkHandler();
          } else {
            return close();
          }
        }}
        onClickCancel={() => {
          return close();
        }}
      />
    )
  }, [isOpen, onOkHandler, message]);

  return { isOpen, open, close, setMessage, ConfirmModalWrapper }
}