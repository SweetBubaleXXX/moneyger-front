import React, { useState } from 'react';
import { Stack } from '@mui/joy';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import TransactionWidget from '../components/transactions/TransactionWidget';

export default () => {
  const [page, setPage] = useState<number>(1);
  const { data: transactions } = useGetTransactionsQuery(page);
  
  return (
    <Stack spacing={2}>
      {
        transactions?.results.map(
          transaction =>
            <TransactionWidget key={transaction.id} {...transaction} />
        )
      }
    </Stack>
  );
};
