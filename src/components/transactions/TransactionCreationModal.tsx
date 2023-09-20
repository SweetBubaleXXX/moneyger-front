import {
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
} from '@mui/joy';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useCreateTransactionMutation } from '../../features/api/apiSlice';
import { TransactionForm } from './TransactionForm';

export type TransactionCreationModalProps = {
  open: boolean,
  onClose: (open: boolean) => void,
}

export const TransactionCreationModal = (
  props: TransactionCreationModalProps
) => {
  const [createTransaction, result] = useCreateTransactionMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to add transaction');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Transaction added');
      props.onClose(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isSuccess]);

  return (
    <Modal open={props.open} onClose={(_, reason) => {
      if (reason !== 'backdropClick') {
        props.onClose(false);
      }
    }}>
      <ModalDialog layout="center">
        <ModalClose />
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogContent>
          <TransactionForm
            onSubmit={createTransaction}
            isLoading={result.isLoading} />
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
