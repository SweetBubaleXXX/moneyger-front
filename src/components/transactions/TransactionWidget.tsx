import React from 'react';
import { Card, CardContent, Sheet, Typography } from '@mui/joy';
import { Transaction } from '../../features/api/types';
import { useGetCategoryByIdQuery } from '../../features/api/apiSlice';
import { Stack } from '@mui/system';

export default (transaction: Transaction) => {
  const { 
    data: category,
    isLoading,
  } = useGetCategoryByIdQuery(transaction.category);
  const transactionDate = new Date(transaction.transaction_time);

  return (
    <Card>
      <CardContent>
        <Stack 
          direction="row" 
          alignItems="center"
          justifyContent="space-between"
        >
          <Sheet>
            <Typography level="title-lg">{category?.name}</Typography>
            <Typography level="body-sm">{transaction.comment}</Typography>
            <Typography level="body-xs">
              {transactionDate.toLocaleTimeString()}, {transactionDate.toDateString()}
            </Typography>
          </Sheet>
          <Typography
            color={transaction.transaction_type === 'IN' ? 'success' : 'danger'}
          >
            {transaction.amount}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
