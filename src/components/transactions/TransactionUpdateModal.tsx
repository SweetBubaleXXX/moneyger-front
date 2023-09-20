import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useUpdateTransactionMutation } from '../../features/api/apiSlice';
import {
  PaginatedTransactionRequest,
  Transaction,
} from '../../features/api/types';
import {
  BaseTransactionModal,
  BaseTransactionModalProps,
} from './BaseTransactionModal';
import { TransactionForm } from './TransactionForm';

export type TransactionUpdateModalProps =
  BaseTransactionModalProps & {
    initialValue: Transaction,
    requestParams?: PaginatedTransactionRequest,
  }

export const TransactionUpdateModal = (
  props: TransactionUpdateModalProps
) => {
  const [updateTransaction, result] = useUpdateTransactionMutation();

  useEffect(() => {
    if (result.isError) {
      toast.error('Failed to update transaction');
    }
  }, [result.isError]);

  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Transaction updated');
      props.onClose(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.isSuccess]);

  return (
    <BaseTransactionModal
      title="Edit Transaction"
      open={props.open}
      onClose={props.onClose}
    >
      <TransactionForm
        onSubmit={request => updateTransaction({
          id: props.initialValue.id,
          params: props.requestParams,
          ...request,
        })}
        submitButtonText="Save"
        isLoading={result.isLoading}
        initialValue={props.initialValue}
      />
    </BaseTransactionModal>
  );
};
