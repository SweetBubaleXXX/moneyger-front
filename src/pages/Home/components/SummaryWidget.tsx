import { Divider, Skeleton, Stack, Typography } from '@mui/joy';
import Decimal from 'decimal.js';
import React from 'react';

import { useGetSummaryQuery } from '../../../api/apiSlice';
import { TransactionFilterRequest } from '../../../api/types';
import { formatCents } from '../../../helpers/currency';
import { useHomeContext } from '../context';

export type SummaryWidgetProps = {
  filters: Partial<TransactionFilterRequest>;
};

export const SummaryWidget = () => {
  const { periodFilters } = useHomeContext();

  const { data: summary, isFetching, isError } = useGetSummaryQuery({ ...periodFilters });

  const showSkeleton = isFetching || isError;
  const income = summary?.currency ? formatCents(summary.totalIncomeCents, summary.currency) : '0';
  const outcome = summary?.currency ? formatCents(summary.totalExpenseCents, summary.currency) : '0';

  const total = new Decimal(income).sub(outcome).toString();

  return (
    <Stack mx="auto" my={2} width="min-content" textAlign="center">
      <Typography level="h2" color="success">
        <Skeleton loading={showSkeleton}>{income}</Skeleton>
      </Typography>
      <Typography level="h2" color="danger">
        <Skeleton loading={showSkeleton}>{+outcome ? `-${outcome}` : '0'}</Skeleton>
      </Typography>
      <Divider sx={{ minWidth: 60 }}>{summary?.currency}</Divider>
      <Typography level="body-lg" color="neutral">
        <Skeleton loading={showSkeleton}>{total}</Skeleton>
      </Typography>
    </Stack>
  );
};
