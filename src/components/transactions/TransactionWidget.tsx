import React from 'react';
import { 
  Card,
  CardContent,
  Sheet,
  Typography,
  Avatar,
} from '@mui/joy';
import { Stack } from '@mui/system';
import { Transaction } from '../../features/api/types';
import { useGetCategoryByIdQuery } from '../../features/api/apiSlice';
import { OVERFLOW_ELLIPSIS } from '../../constants';

export default (transaction: Transaction) => {
  const { 
    data: category,
    isLoading,
  } = useGetCategoryByIdQuery(transaction.category);
  const transactionDate = new Date(transaction.transaction_time);

  return (
    <Card variant="outlined" sx={{'--Card-padding': '8px'}}>
      <CardContent>
        <Stack 
          direction="row" 
          alignItems="center"
          justifyContent="stretch"
          sx={{gap: 1}}
        >
          <Avatar>{category?.icon}</Avatar>
          <Sheet sx={{flexGrow: 1, overflow: 'hidden'}}>
            <Typography level="title-lg">{category?.name}</Typography>
            <Typography level="body-sm" sx={OVERFLOW_ELLIPSIS}>
              {transaction.comment}
            </Typography>
            <Typography level="body-xs" sx={OVERFLOW_ELLIPSIS}>
              {transactionDate.toLocaleTimeString()}, {transactionDate.toDateString()}
            </Typography>
          </Sheet>
          <Typography
            level="body-md"
            textAlign="right"
            color={transaction.transaction_type === 'IN' ? 'success' : 'danger'}
          >
            {transaction.amount} {transaction.currency}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
