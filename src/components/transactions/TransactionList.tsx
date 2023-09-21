import { Button, Stack } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useMemo, useState } from 'react';

import {
  transactionsSelector,
  useGetTransactionsQuery,
} from '../../features/api/apiSlice';
import { PAGE_SIZE } from '../../features/api/constants';
import { TransactionRequestParams } from '../../features/api/types';
import { TransactionWidget } from './TransactionWidget';

export type TransactionListProps = {
  filters: Partial<TransactionRequestParams>,
  freezeState?: boolean,
  sx?: SxProps
}

export const TransactionList = (props: TransactionListProps) => {
  const [page, setPage] = useState<number>(1);
  const [
    transactionDuplicateModalOpen,
    setTransactionDuplicateModalOpen,
  ] = useState<boolean>(false);
  const getTransactionsRequestParams = {
    page,
    params: props.filters,
  };
  const freezeState = props.freezeState || transactionDuplicateModalOpen;
  const transactions = useGetTransactionsQuery(
    freezeState ? skipToken : getTransactionsRequestParams
  );
  const totalPages = useMemo(
    () => (transactions.data?.count || 0) / PAGE_SIZE,
    [transactions.data?.count]
  );
  const showLoadMoreButton = totalPages > page;

  useEffect(() => {
    if (freezeState) {
      setPage(1);
    }
  }, [freezeState]);

  useEffect(() => {
    setPage(1);
  }, [props.filters]);

  return (
    <Stack spacing={2} padding={2} marginX="auto" sx={{
      maxWidth: { sm: 'sm' },
      ...props.sx,
    }}>
      {
        transactions.data && transactionsSelector
          .selectAll(transactions.data.results)
          .map(
            (transaction, index) =>
              <TransactionWidget
                key={index}
                transaction={transaction}
                loading={transactions.isFetching}
                requestParams={getTransactionsRequestParams}
                onDuplicateModalOpen={setTransactionDuplicateModalOpen}
              />
          )
      }
      {
        showLoadMoreButton && <Button
          variant="outlined"
          loading={transactions.isFetching}
          onClick={() => setPage(page + 1)}
        >
          Load More
        </Button>
      }
    </Stack>
  );
};
