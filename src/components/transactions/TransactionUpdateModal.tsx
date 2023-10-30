import React from 'react';

import { useUpdateTransactionMutation } from '../../features/api/apiSlice';
import {
  PaginatedTransactionRequest,
  Transaction,
} from '../../features/api/types';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { TransactionForm } from '../forms/TransactionForm';
import {
  BaseTransactionModalProps,
  TransactionModal,
} from './TransactionModal';

export type TransactionUpdateModalProps =
  BaseTransactionModalProps & {
    initialValue: Transaction,
    requestParams?: PaginatedTransactionRequest,
  }

export const TransactionUpdateModal = ({
  open,
  onClose,
  initialValue,
  requestParams,
}: TransactionUpdateModalProps) => {
  const [updateTransaction, result] = useUpdateTransactionMutation();

  useErrorSnackbar('Failed to update transaction', result);

  useSuccessSnackbar(
    'Transaction updated',
    result,
    () => onClose(false)
  );

  return (
    <TransactionModal
      title="Edit Transaction"
      open={open}
      onClose={onClose}
    >
      <TransactionForm
        onSubmit={request => updateTransaction({
          id: initialValue.id,
          params: requestParams,
          ...request,
        })}
        submitButtonText="Save"
        isLoading={result.isLoading}
        initialValue={initialValue}
      />
    </TransactionModal>
  );
};
