import { Button, CircularProgress, Stack } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect, useMemo, useState } from 'react';

import { transactionsSelector, useGetTransactionsQuery } from '../../api/apiSlice';
import { PAGE_SIZE } from '../../api/constants';
import { TransactionFilterRequest } from '../../api/types';
import { TransactionWidget } from './TransactionWidget';

export type TransactionListProps = {
  filters: Partial<TransactionFilterRequest>;
  skip?: boolean;
  loading?: boolean;
  sx?: SxProps;
};

export const TransactionList = ({ filters, skip, loading, sx }: TransactionListProps) => {
  const [transactionDuplicateModalOpen, setTransactionDuplicateModalOpen] = useState<boolean>(false);

  const [requestParams, setRequestParams] = useState<TransactionFilterRequest>({
    ...filters,
    page: 1,
  });

  const skipUpdate = skip || transactionDuplicateModalOpen;

  const transactions = useGetTransactionsQuery(skipUpdate ? skipToken : requestParams);

  const totalPages = useMemo(
    () => (transactions.data?.resultLength || 0) / PAGE_SIZE,
    [transactions.data?.resultLength],
  );

  const transactionsList = useMemo(
    () =>
      transactions.data &&
      transactionsSelector
        .selectAll(transactions.data.result)
        .map((transaction, index) => (
          <TransactionWidget
            key={index}
            transaction={transaction}
            isLoading={transactions.isFetching}
            requestParams={requestParams}
            onDuplicateModalOpen={setTransactionDuplicateModalOpen}
          />
        )),
    [requestParams, transactions.data, transactions.isFetching],
  );

  const showSpinner = !transactionsList || (!transactionsList.length && transactions.isFetching);

  const showLoadMoreButton = totalPages > (requestParams.page ?? 1);

  useEffect(() => {
    setRequestParams({
      ...filters,
      page: 1,
    });
  }, [filters]);

  return (
    <Stack spacing={2} padding={2} marginX="auto" maxWidth={{ sm: 'sm' }} sx={sx}>
      {loading || showSpinner ? (
        <CircularProgress sx={{ alignSelf: 'center' }} />
      ) : (
        <>
          {transactionsList}
          {showLoadMoreButton && (
            <Button
              variant="outlined"
              color="neutral"
              loading={transactions.isFetching}
              onClick={() =>
                setRequestParams({
                  ...requestParams,
                  page: requestParams.page && requestParams.page + 1,
                })
              }
            >
              Load More
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};
