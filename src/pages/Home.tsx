import React, { useState } from 'react';
import { Box, Stack } from '@mui/joy';
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

export default () => {
  const [page, setPage] = useState<number>(1);
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);
  const { data: transactions } = useGetTransactionsQuery(page);
  const { data: summary } = useGetTransactionsSummaryQuery({
    transactionTimeAfter: period.from.toISOString(),
    transactionTimeBefore: period.to.toISOString(),
  });

  return (
    <>
      <Box display="flex" justifyContent="center" padding={2}>
        <PeriodSelector value={period} onChange={setPeriod}/>
      </Box>
      {summary?.total} {summary?.currency}
      <Stack spacing={2} padding={2} marginX="auto" sx={{
        maxWidth: {
          sm: 'sm',
        },
      }}>
        {
          transactions?.results.map(
            transaction =>
              <TransactionWidget key={transaction.id} {...transaction} />
          )
        }
      </Stack>
    </>
  );
};
