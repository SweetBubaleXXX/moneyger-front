import React from 'react';

import { useCreateTransactionMutation } from '../../api/apiSlice';
import { Transaction } from '../../api/types';
import { TransactionForm } from '../../forms/TransactionForm';
import { useErrorSnackbar, useSuccessSnackbar } from '../../hooks/snackbar';
import { BaseTransactionModalProps, TransactionModal } from './TransactionModal';

export type TransactionCreationModalProps = BaseTransactionModalProps & { initialValue?: Transaction };

export const TransactionCreationModal = ({ open, onClose, initialValue }: TransactionCreationModalProps) => {
  const [createTransaction, result] = useCreateTransactionMutation();

  useErrorSnackbar('Не удалось добавить транзакцию', result);

  useSuccessSnackbar('Транзакция добавлена', result, () => onClose(false));

  return (
    <TransactionModal title="Добавить транзакцию" open={open} onClose={onClose}>
      <TransactionForm
        onSubmit={createTransaction}
        submitButtonText="Добавить"
        isLoading={result.isLoading}
        initialValue={initialValue}
      />
    </TransactionModal>
  );
};
