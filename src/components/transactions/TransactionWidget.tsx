import React from 'react';
import { Card, CardContent, Typography } from '@mui/joy';
import { Transaction } from '../../features/api/types';
import { useGetCategoryByIdQuery } from '../../features/api/apiSlice';

export default (transaction: Transaction) => {
  const { 
    data: category,
    isLoading,
  } = useGetCategoryByIdQuery(transaction.category);

  return (
    <Card>
      <CardContent>
        <Typography level="title-lg">{category?.name}</Typography>
        <Typography level="body-sm">{transaction.comment}</Typography>
        {transaction.amount}
      </CardContent>
    </Card>
  );
};
