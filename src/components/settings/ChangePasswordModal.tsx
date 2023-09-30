import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import React from 'react';

import { ChangePasswordForm } from '../forms/ChangePasswordForm';

export type ChangePasswordModalProps = {
  open: boolean,
  onClose: () => void,
}

export const ChangePasswordModal = ({
  open,
  onClose,
}: ChangePasswordModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <ChangePasswordForm onSuccess={onClose} />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
