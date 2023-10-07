import { Box, Stack, Typography } from '@mui/joy';
import React, { useState } from 'react';

import { CategoryIcon } from '../components/categories/CategoryIcon';
import {
  DEFAULT_PERIOD,
  PeriodSelector,
} from '../components/period/PeriodSelector';
import { Period } from '../components/period/types';
import {
  CategoriesStatsWidget,
} from '../components/summary/CategoriesStatsWidget';
import { BaseTopbar } from '../components/toolbars/BaseTopbar';
import { NavigationBar } from '../components/toolbars/NavigationBar';
import {
  selectCategoryById,
  useGetAllCategoriesQuery,
} from '../features/api/apiSlice';
import { parsePeriodFilters } from '../helpers/period';
import { useCategoryIdParam } from '../hooks/params';

export const CategoryStatistics = () => {
  const categoryId = useCategoryIdParam();
  const [period, setPeriod] = useState<Period>(DEFAULT_PERIOD);

  const category = useGetAllCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      data: selectCategoryById(data, categoryId),
      isLoading,
    }),
  });

  const periodFilters = parsePeriodFilters(period);

  return (
    <>
      <BaseTopbar justifyContent="center">
        <Stack
          direction="row"
          alignItems="center"
          p={0.5}
          gap={1}
        >
          {
            category.data && <CategoryIcon color={category.data.color}>
              {category.data.icon}
            </CategoryIcon>
          }
          <Typography level="title-md">
            {category.data?.name}
          </Typography>
        </Stack>
      </BaseTopbar>
      <PeriodSelector value={period} onChange={setPeriod} />
      <Box mb="50px">
        {
          category.data &&
          <CategoriesStatsWidget
            transactionType={category.data.transactionType}
            filters={{
              ...periodFilters,
              parent_category: categoryId,
            }}
          />
        }
      </Box>
      <NavigationBar />
    </>
  );
};
