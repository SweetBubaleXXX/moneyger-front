import { Button, Stack } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useMemo, useState } from 'react';

import {
  transactionsSelector,
  useGetTransactionsQuery,
} from '../../features/api/apiSlice';
import { PAGE_SIZE } from '../../features/api/constants';
import {
  PaginatedTransactionRequest,
  TransactionRequestParams,
} from '../../features/api/types';
import { TransactionWidget } from './TransactionWidget';

export type TransactionListProps = {
  filters: Partial<TransactionRequestParams>,
  reset?: boolean,
  sx?: SxProps
}

export const TransactionList = ({
  filters,
  reset,
  sx,
}: TransactionListProps) => {
  const [page, setPage] = useState<number>(1);

  const [
    transactionDuplicateModalOpen,
    setTransactionDuplicateModalOpen,
  ] = useState<boolean>(false);

  const [
    requestParams, setRequestParams,
  ] = useState<PaginatedTransactionRequest>({
    page,
    params: filters,
  });

  const resetCache = reset || transactionDuplicateModalOpen;

  const transactions = useGetTransactionsQuery(
    resetCache ? skipToken : requestParams
  );

  const totalPages = useMemo(
    () => (transactions.data?.count || 0) / PAGE_SIZE,
    [transactions.data?.count]
  );

  const showLoadMoreButton = totalPages > page;

  useEffect(() => {
    if (resetCache) {
      setPage(1);
    }
  }, [resetCache]);

  useEffect(() => {
    setPage(1);
    setRequestParams({
      page: 1,
      params: filters,
    });
  }, [filters]);

  useEffect(() => {
    setRequestParams({
      page,
      params: requestParams.params,
    });
  }, [page, requestParams.params]);

  return (
    <Stack spacing={2} padding={2} marginX="auto" sx={{
      maxWidth: { sm: 'sm' },
      ...sx,
    }}>
      {
        transactions.data && transactionsSelector
          .selectAll(transactions.data.results)
          .map(
            (transaction, index) =>
              <TransactionWidget
                key={index}
                transaction={transaction}
                isLoading={transactions.isFetching}
                requestParams={requestParams}
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
