import {
  Box,
  Button,
  IconButton,
  Stack,
} from '@mui/joy';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Cross } from 'lucide-react';
import React, { useState } from 'react';

import {
  DEFAULT_PERIOD,
  PeriodSelector,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import { SummaryWidget } from '../components/summary/SummaryWidget';
import {
  TransactionCreationModal,
} from '../components/transactions/TransactionCreationModal';
import {
  TransactionWidget,
} from '../components/transactions/TransactionWidget';
import {
  transactionsSelector,
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
} from '../features/api/apiSlice';
import { PAGE_SIZE } from '../features/api/constants';

export const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [
    transactionCreationModalOpen,
    setTransactionCreationModalOpen,
  ] = useState<boolean>(false);
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const periodFilters = {
    transactionTimeAfter: period.from.toISOString(),
    transactionTimeBefore: period.to.toISOString(),
  };
  const getTransactionsRequestParams = {
    page,
    params: periodFilters,
  };
  const transactions = useGetTransactionsQuery(
    transactionCreationModalOpen ? skipToken : getTransactionsRequestParams
  );
  const incomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'IN',
    ...periodFilters,
  });
  const outcomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'OUT',
    ...periodFilters,
  });
  const totalPages = (transactions.data?.count || 0) / PAGE_SIZE;
  const showLoadMoreButton = totalPages > page;

  return (
    <>
      <SummaryWidget
        income={incomeSummary.data?.total || 0}
        outcome={outcomeSummary.data?.total || 0}
        currency={incomeSummary.data?.currency}
        isLoading={incomeSummary.isFetching || outcomeSummary.isFetching}
        isError={incomeSummary.isError || outcomeSummary.isError}
      />
      <Box display="flex" justifyContent="center" padding={2}>
        <PeriodSelector value={period} onChange={value => {
          setPeriod(value);
          setPage(1);
        }} />
      </Box>
      <Stack spacing={2} padding={2} marginX="auto" sx={{
        maxWidth: { sm: 'sm' },
        marginBottom: '75px',
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
                  requestParams={getTransactionsRequestParams} />
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
      <Box
        zIndex={1250}
        position="fixed"
        bottom={0}
        paddingBottom={1.5}
        width="100%"
        display="flex"
        justifyContent="center"
      >
        <IconButton
          variant="solid"
          onClick={() => {
            setTransactionCreationModalOpen(true);
            setPage(1);
          }}
          sx={{
            '--IconButton-size': '70px',
            borderRadius: '100%',
          }}
        >
          <Cross />
        </IconButton>
      </Box>
      <TransactionCreationModal
        open={transactionCreationModalOpen}
        onClose={setTransactionCreationModalOpen}
      />
    </>
  );
};
