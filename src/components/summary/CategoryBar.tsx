import { LinearProgress, Stack, Typography } from '@mui/joy';
import React from 'react';

import { Category, CurrencyCode } from '../../api/types';
import { formatCents } from '../../helpers/currency';
import { useContrastColor } from '../../hooks/color';
import { CategoryIcon } from '../categories/CategoryIcon';

type CategoryStats = {
  category: Category;
  amountCents: number;
};

export type CategoryBarProps = {
  stats: CategoryStats;
  totalCents: number;
  currency: CurrencyCode;
};

export const CategoryBar = ({ stats, totalCents, currency }: CategoryBarProps) => {
  const adjustColor = useContrastColor();

  const percentage = ((100 * stats.amountCents) / totalCents).toFixed(2);

  return (
    <Stack direction="row" alignItems="center" py={0.3} gap={1}>
      <Stack>
        <CategoryIcon color={stats.category.color}>{stats.category.icon}</CategoryIcon>
      </Stack>
      <Stack flexGrow={1} gap={0.5} overflow="hidden">
        <Stack direction="row" gap={0.75} alignItems="baseline">
          <Typography level="title-md" noWrap>
            {stats.category.name}
          </Typography>
          <Typography level="body-xs">{percentage}%</Typography>
          <Typography level="body-sm" textAlign="right" flexGrow={1}>
            {formatCents(stats.amountCents, currency)} {currency}
          </Typography>
        </Stack>
        <LinearProgress
          variant="plain"
          value={+percentage}
          determinate
          sx={{
            color: adjustColor(stats.category.color),
          }}
        />
      </Stack>
    </Stack>
  );
};
