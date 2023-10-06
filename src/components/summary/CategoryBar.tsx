import { LinearProgress, Skeleton, Stack, Typography } from '@mui/joy';
import React from 'react';

import { useGetCategorySummaryQuery } from '../../features/api/apiSlice';
import { Category, TransactionRequestParams } from '../../features/api/types';
import { useContrastColor } from '../../hooks/color';
import { CategoryIcon } from '../categories/CategoryIcon';

export type CategoryBarProps = {
  category: Category,
  total: number,
  filters?: TransactionRequestParams,
}

export const CategoryBar = ({
  category,
  total,
  filters,
}: CategoryBarProps) => {
  const adjustColor = useContrastColor();

  const summary = useGetCategorySummaryQuery({
    id: category.id,
    ...filters,
  });

  const percentage = !!summary.data?.total && (100 * summary.data.total / total).toFixed(2);

  return (
    <>
      {!!+percentage &&
        <Stack direction="row" alignItems="center" gap={1}>
          <Stack>
            <CategoryIcon color={category.color}>{category.icon}</CategoryIcon>
          </Stack>
          <Stack flexGrow={1} gap={0.5} overflow="hidden">
            <Stack
              direction="row"
              gap={0.75}
              alignItems="baseline"
            >
              <Typography level="title-md" noWrap>
                <Skeleton loading={summary.isFetching}>
                  {category.name}
                </Skeleton>
              </Typography>
              <Typography level="body-xs">
                <Skeleton loading={summary.isFetching}>
                  {percentage}%
                </Skeleton>
              </Typography>
              <Typography level="body-sm" textAlign="right" flexGrow={1}>
                <Skeleton loading={summary.isFetching}>
                  {summary.data && Math.abs(summary.data.total)} {summary.data?.currency}
                </Skeleton>
              </Typography>
            </Stack>
            <LinearProgress
              variant="plain"
              value={+percentage}
              determinate
              sx={{
                color: adjustColor(category.color),
              }}
            />
          </Stack>
        </Stack>
      }
    </>
  );
};
