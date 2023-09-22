import {
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/joy';
import Decimal from 'decimal.js';
import React, { useMemo } from 'react';

import { useGetTransactionsSummaryQuery } from '../../features/api/apiSlice';
import { TransactionRequestParams } from '../../features/api/types';

export type SummaryWidgetProps = {
  filters: Partial<TransactionRequestParams>
}

export const SummaryWidget = ({ filters }: SummaryWidgetProps) => {
  const incomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'IN',
    ...filters,
  });

  const outcomeSummary = useGetTransactionsSummaryQuery({
    transactionType: 'OUT',
    ...filters,
  });

  const isLoading = incomeSummary.isFetching || outcomeSummary.isFetching;
  const isError = incomeSummary.isError || outcomeSummary.isError;
  const showSkeleton = isLoading || isError;
  const income = incomeSummary.data?.total || 0;
  const outcome = outcomeSummary.data?.total || 0;

  const total = useMemo(
    () => new Decimal(income).add(outcome).toString(),
    [income, outcome]
  );

  return (
    <Stack mx="auto" my={2} width="min-content" textAlign="center">
      <Typography level="h2" color="success">
        <Skeleton loading={showSkeleton}>
          {income}
        </Skeleton>
      </Typography>
      <Typography level="h2" color="danger">
        <Skeleton loading={showSkeleton}>
          {outcome}
        </Skeleton>
      </Typography>
      <Divider sx={{ minWidth: 60 }}>
        {incomeSummary.data?.currency}
      </Divider>
      <Typography level="body-lg" color="neutral">
        <Skeleton loading={showSkeleton}>
          {total}
        </Skeleton>
      </Typography>
    </Stack>
  );
};
