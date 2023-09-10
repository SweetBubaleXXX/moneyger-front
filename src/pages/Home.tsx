import React, { useState } from 'react';
import { Box, Stack } from '@mui/joy';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import {
  TransactionWidget,
} from '../components/transactions/TransactionWidget';
import {
  PeriodSelector, 
  Period,
  DEFAULT_PERIOD,
} from '../components/period/PeriodSelector';

export default () => {
  const [page, setPage] = useState<number>(1);
  const { data: transactions } = useGetTransactionsQuery(page);
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);

  return (
    <>
      <Box display="flex" justifyContent="center" padding={2}>
        <PeriodSelector onChange={setPeriod}/>
      </Box>
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
