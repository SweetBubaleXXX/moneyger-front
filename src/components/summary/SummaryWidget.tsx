import React from 'react';
import Decimal from 'decimal.js';
import {
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/joy';
import { CurrencyCode } from '../../features/api/types';

export type SummaryWidgetProps = {
  income: number,
  outcome: number,
  currency?: CurrencyCode,
  isLoading?: boolean,
  isError?: boolean,
}

export const SummaryWidget = (props: SummaryWidgetProps) => {
  const showSkeleton = props.isLoading || props.isError;

  return (
    <Stack mx="auto" my={2} width="min-content" textAlign="center">
      <Typography level="h2" color="success">
        <Skeleton loading={showSkeleton}>
          {props.income}
        </Skeleton>
      </Typography>
      <Typography level="h2" color="danger">
        <Skeleton loading={showSkeleton}>
          {props.outcome}
        </Skeleton>
      </Typography>
      <Divider sx={{ minWidth: 60 }}>
        {props.currency}
      </Divider>
      <Typography level="body-lg" color="neutral">
        <Skeleton loading={showSkeleton}>{
          new Decimal(props.income)
            .add(props.outcome)
            .toString()
        }</Skeleton>
      </Typography>
    </Stack>
  );
};
