import { useState, useCallback } from 'react';
import { UpdateTodoModal, OnOKHandlerType } from './index';
import { TodoInput } from '../../../types';

export const useUpdateTodoModal = () => {
  const [todoInput, setTodoInput] = useState<TodoInput | undefined>();
  const [isOpen, setIsOpen] = useState(false);
  const [onOKHandler, setOnOKHandler] = useState<OnOKHandlerType>();

  const open = useCallback(
    (callback: OnOKHandlerType) => {
      setIsOpen(true);
      setOnOKHandler(() => {
        return callback;
      });
    },
    [setIsOpen, setOnOKHandler]
  );
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const UpdateTodoModalWrapper = useCallback(() => {
    if (!todoInput) return <></>;

    return (
      <UpdateTodoModal
        isOpen={isOpen}
        input={todoInput}
        onClickOK={(input: TodoInput) => {
          if (onOKHandler) onOKHandler(input);
          close();
        }}
        onClickCancel={() => {
          close();
        }}
      />
    );
  }, [isOpen, onOKHandler, todoInput]);

  return { isOpen, open, close, setTodoInput, UpdateTodoModalWrapper };
};