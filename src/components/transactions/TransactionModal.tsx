import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import React, { ReactNode } from 'react';

export type BaseTransactionModalProps = {
  open: boolean,
  onClose: (open: boolean) => void,
}

export type TransactionModalProps = BaseTransactionModalProps & {
  title: string,
  children: ReactNode,
}

export const TransactionModal = (
  {
    title,
    open,
    onClose,
    children,
  }: TransactionModalProps
) => {
  const onModalClose = (
    _: any,
    reason: 'backdropClick' | 'escapeKeyDown' | 'closeClick'
  ) => {
    if (reason !== 'backdropClick') {
      onClose(false);
    }
  };

  return (
    <Modal open={open} onClose={onModalClose}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
