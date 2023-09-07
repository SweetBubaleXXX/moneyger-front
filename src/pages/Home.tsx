import React, { useState } from 'react';
import { Button } from '@mui/joy';
import { useGetTransactionsQuery } from '../features/api/apiSlice';
import TransactionWidget from '../components/transactions/TransactionWidget';

export default () => {
  const [page, setPage] = useState<number>(1);
  const { data: transactions } = useGetTransactionsQuery(page);
  
  return (
    <>
      {
        transactions?.results.map(
          transaction =>
            <TransactionWidget key={transaction.id} {...transaction} />
        )
      }
    </>
  );
};
