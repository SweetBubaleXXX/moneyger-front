import React from 'react';
import { 
  Card,
  CardContent,
  Sheet,
  Typography,
  Avatar,
  Skeleton,
} from '@mui/joy';
import { Stack } from '@mui/system';
import moment from 'moment';
import { Transaction } from '../../features/api/types';
import {
  useGetAllCategoriesQuery, 
} from '../../features/api/apiSlice';
import { OVERFLOW_ELLIPSIS } from '../../constants';

export type TransactionWidgetProps = {
  transaction: Transaction,
  loading?: boolean,
}

export const TransactionWidget = (props: TransactionWidgetProps) => {
  const { category } = useGetAllCategoriesQuery(undefined, {
    selectFromResult: result => ({
      category: result.data?.find(
        category => category.id === props.transaction.category
      ),
    }),
  });
  const isLoading = props.loading ?? false;

  return (
    <Card 
      variant="outlined"
      sx={{'--Card-padding': '8px'}}>
      <CardContent>
        <Stack 
          direction="row" 
          alignItems="center"
          justifyContent="stretch"
          sx={{gap: 1}}
        >
          <Avatar>
            <Skeleton loading={isLoading}>
              {category?.icon}
            </Skeleton>
          </Avatar>
          <Sheet sx={{flexGrow: 1, overflow: 'hidden'}}>
            <Typography level="title-lg"  sx={OVERFLOW_ELLIPSIS}>
              <Skeleton loading={isLoading}>
                {category?.name}
              </Skeleton>
            </Typography>
            <Typography level="body-sm" sx={OVERFLOW_ELLIPSIS}>
              <Skeleton loading={isLoading}>
                {props.transaction.comment}
              </Skeleton>
            </Typography>
            <Typography level="body-xs" sx={OVERFLOW_ELLIPSIS}>
              <Skeleton loading={isLoading}>
                {moment(props.transaction.transactionTime).format('llll')}
              </Skeleton>
            </Typography>
          </Sheet>
          <Typography
            level="body-md"
            textAlign="right"
            color={
              props.transaction.transactionType === 'IN' ? 'success' : 'danger'
            }
          >
            <Skeleton loading={isLoading}>
              {props.transaction.amount} {props.transaction.currency}
            </Skeleton>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
