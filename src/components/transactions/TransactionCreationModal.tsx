import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useCreateTransactionMutation } from '../../features/api/apiSlice';
import { Transaction } from '../../features/api/types';
import { TransactionForm } from '../forms/TransactionForm';
import {
  BaseTransactionModalProps,
  TransactionModal,
} from './TransactionModal';

export type TransactionCreationModalProps =
  BaseTransactionModalProps & { initialValue?: Transaction }

export const TransactionCreationModal = ({
  open,
  onClose,
  initialValue,
}: TransactionCreationModalProps) => {
  const [createTransaction, result] = useCreateTransactionMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to add transaction');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Transaction added');
      onClose(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isSuccess]);

  return (
    <TransactionModal
      title="Add Transaction"
      open={open}
      onClose={onClose}
    >
      <TransactionForm
        onSubmit={createTransaction}
        submitButtonText="Add"
        isLoading={result.isLoading}
        initialValue={initialValue}
      />
    </TransactionModal>

  );
};
