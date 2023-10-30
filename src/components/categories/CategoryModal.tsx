import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import React, { ReactNode } from 'react';

export type CategoryModalProps = {
  open: boolean,
  onClose: (open: boolean) => void,
  title: string,
  children: ReactNode,
}

export const CategoryModal = (
  {
    title,
    open,
    onClose,
    children,
  }: CategoryModalProps
) => {
  return (
    <Modal open={open} onClose={() => onClose(false)}>
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
