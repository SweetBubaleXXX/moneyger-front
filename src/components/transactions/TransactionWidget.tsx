import React from 'react';
import { 
  Card,
  CardContent,
  Sheet,
  Typography,
  Avatar,
} from '@mui/joy';
import { Stack } from '@mui/system';
import moment from 'moment';
import { Transaction } from '../../features/api/types';
import {
  useGetAllCategoriesQuery, 
} from '../../features/api/apiSlice';
import { OVERFLOW_ELLIPSIS } from '../../constants';

export const TransactionWidget = (transaction: Transaction) => {
  const { category } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      category: result.data?.find(
        category => category.id === transaction.category
      ),
    }),
  });

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
            <Typography level="title-lg"  sx={OVERFLOW_ELLIPSIS}>
              {category?.name}
            </Typography>
            <Typography level="body-sm" sx={OVERFLOW_ELLIPSIS}>
              {transaction.comment}
            </Typography>
            <Typography level="body-xs" sx={OVERFLOW_ELLIPSIS}>
              {moment(transaction.transactionTime).format('llll')}
            </Typography>
          </Sheet>
          <Typography
            level="body-md"
            textAlign="right"
            color={transaction.transactionType === 'IN' ? 'success' : 'danger'}
          >
            {transaction.amount} {transaction.currency}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
