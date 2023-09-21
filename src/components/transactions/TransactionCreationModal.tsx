import React, { useEffect } from 'react';
import { toast } from 'sonner';

import { useCreateTransactionMutation } from '../../features/api/apiSlice';
import { Transaction } from '../../features/api/types';
import {
  BaseTransactionModal,
  BaseTransactionModalProps,
} from './BaseTransactionModal';
import { TransactionForm } from './TransactionForm';

export type TransactionCreationModalProps =
  BaseTransactionModalProps & { initialValue?: Transaction }

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
    <BaseTransactionModal
      title="Add Transaction"
      open={props.open}
      onClose={props.onClose}
    >
      <TransactionForm
        onSubmit={createTransaction}
        submitButtonText="Add"
        isLoading={result.isLoading}
        initialValue={props.initialValue}
      />
    </BaseTransactionModal>

  );
};
