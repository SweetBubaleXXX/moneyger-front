import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateTransactionMutation } from '../../features/api/apiSlice';
import {
  PaginatedTransactionRequest,
  Transaction,
} from '../../features/api/types';
import { TransactionForm } from './TransactionForm';
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

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to update transaction');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Transaction updated');
      onClose(false);
    }
  }, [result.isSuccess, onClose]);

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
