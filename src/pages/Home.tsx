import React, { useState } from 'react';
import {
  Box,
  Stack,
} from '@mui/joy';
import { 
  useGetTransactionsQuery,
  useGetTransactionsSummaryQuery,
} from '../features/api/apiSlice';
import {
  TransactionWidget,
} from '../components/transactions/TransactionWidget';
import {
  PeriodSelector, 
  DEFAULT_PERIOD,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import { SummaryWidget } from '../components/summary/SummaryWidget';

export default () => {
  const [page, setPage] = useState<number>(1);
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const periodFilters = {
    transactionTimeAfter: period.from.toISOString(),
    transactionTimeBefore: period.to.toISOString(),
  };
  const transactions = useGetTransactionsQuery({
    page,
    params: periodFilters,
  });
  const incomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'IN',
    ...periodFilters,
  });
  const outcomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'OUT',
    ...periodFilters,
  });

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
        <PeriodSelector value={period} onChange={setPeriod}/>
      </Box>
      <Stack spacing={2} padding={2} marginX="auto" sx={{
        maxWidth: {
          sm: 'sm',
        },
      }}>
        {
          transactions.data?.results.map(
            transaction =>
              <TransactionWidget
                key={transaction.id} 
                transaction={transaction}
                loading={transactions.isFetching}/>
          )
        }
      </Stack>
    </>
  );
};
