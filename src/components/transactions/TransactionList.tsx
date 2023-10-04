import { Button, CircularProgress, Stack } from '@mui/joy';
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
  const [
    transactionDuplicateModalOpen,
    setTransactionDuplicateModalOpen,
  ] = useState<boolean>(false);

  const [
    requestParams, setRequestParams,
  ] = useState<PaginatedTransactionRequest>({
    page: 1,
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

  const transactionsList = transactions.data && transactionsSelector
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
    );

  const showSpinner = !transactionsList || (
    !transactionsList.length && transactions.isFetching
  );

  const showLoadMoreButton = totalPages > (requestParams.page ?? 1);

  useEffect(() => {
    setRequestParams({
      page: 1,
      params: filters,
    });
  }, [filters]);

  return (
    <Stack
      spacing={2}
      padding={2}
      marginX="auto"
      maxWidth={{ sm: 'sm' }}
      sx={sx}
    >
      {
        showSpinner ?
          <CircularProgress
            color="neutral"
            sx={{ alignSelf: 'center' }}
          />
          :
          transactionsList
      }
      {
        showLoadMoreButton && <Button
          variant="outlined"
          loading={transactions.isFetching}
          onClick={() => setRequestParams({
            page: requestParams.page && requestParams.page + 1,
            params: requestParams.params,
          })}
        >
          Load More
        </Button>
      }
    </Stack>
  );
};
