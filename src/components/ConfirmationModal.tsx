import {
  Button,
  ButtonProps,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import { AlertTriangle } from 'lucide-react';
import React, { ReactNode } from 'react';

export type ConfirmationModalProps = {
  open: boolean,
  onCancel: () => void,
  onConfirm: () => void,
  confirmButtonText?: string,
  confirmButtonProps?: ButtonProps,
  loading?: boolean,
  children?: ReactNode,
}

export const ConfirmationModal = ({
  open,
  onCancel,
  onConfirm,
  confirmButtonText = 'Confirm',
  confirmButtonProps,
  loading,
  children,
}: ConfirmationModalProps) => {
  return (
    <Modal
      open={open}
      onClose={onCancel}
    >
      <ModalDialog variant="outlined">
        <DialogTitle>
          <AlertTriangle />
          Confirmation
        </DialogTitle>
        <Divider />
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            {...confirmButtonProps}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </Button>
          <Button
            variant="plain"
            color="neutral"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};
