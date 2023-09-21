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

export const BaseTransactionModal = (
  props: BaseTransactionModalProps & {
    title: string,
    children: ReactNode,
  }
) => {
  return (
    <Modal open={props.open} onClose={(_, reason) => {
      if (reason !== 'backdropClick') {
        props.onClose(false);
      }
    }}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          {props.children}
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
