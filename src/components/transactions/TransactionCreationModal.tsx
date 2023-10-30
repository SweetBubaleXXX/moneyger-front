import React from 'react';

import { useCreateTransactionMutation } from '../../features/api/apiSlice';
import { Transaction } from '../../features/api/types';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
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

  useErrorSnackbar('Failed to add transaction', result);

  useSuccessSnackbar(
    'Transaction added',
    result,
    () => onClose(false)
  );

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
