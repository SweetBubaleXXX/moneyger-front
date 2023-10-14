import { LinearProgress, Skeleton, Stack, Typography } from '@mui/joy';
import React, { useMemo } from 'react';

import {
  selectCategoryById,
  useGetCategoriesQuery,
} from '../../features/api/apiSlice';
import { CategoryStats, CurrencyCode } from '../../features/api/types';
import { useContrastColor } from '../../hooks/color';
import { CategoryIcon } from '../categories/CategoryIcon';

export type CategoryBarProps = {
  stats: CategoryStats,
  total: number,
  currency?: CurrencyCode,
}

export const CategoryBar = ({
  stats,
  total,
  currency,
}: CategoryBarProps) => {
  const adjustColor = useContrastColor();

  const category = useGetCategoriesQuery(undefined, {
    selectFromResult: result => ({
      data: selectCategoryById(result.data, stats.id),
      isLoading: result.isFetching,
    }),
  });

  const percentage = useMemo(
    () => (100 * stats.total / total).toFixed(2),
    [stats.total, total]
  );

  return (
    <>
      {!!category.data &&
        <Stack
          direction="row"
          alignItems="center"
          py={0.3}
          gap={1}
        >
          <Stack>
            <Skeleton loading={category.isLoading}>
              <CategoryIcon color={category.data.color}>
                {category.data.icon}
              </CategoryIcon>
            </Skeleton>
          </Stack>
          <Stack flexGrow={1} gap={0.5} overflow="hidden">
            <Stack
              direction="row"
              gap={0.75}
              alignItems="baseline"
            >
              <Typography level="title-md" noWrap>
                <Skeleton loading={category.isLoading}>
                  {category.data.name}
                </Skeleton>
              </Typography>
              <Typography level="body-xs">
                {percentage}%
              </Typography>
              <Typography level="body-sm" textAlign="right" flexGrow={1}>
                {Math.abs(stats.total)} {currency}
              </Typography>
            </Stack>
            <LinearProgress
              variant="plain"
              value={+percentage}
              determinate
              sx={{
                color: adjustColor(category.data.color),
              }}
            />
          </Stack>
        </Stack>
      }
    </>
  );
};
